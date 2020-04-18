import axios, { Method } from 'axios';
import debug from 'debug';
import { AftershipResponse, Meta } from './models/response';

const debugMakeRequest = debug('aftership:makeRequest');
const debugProcessResponse = debug('aftership:processResponse');
const debugProcessException = debug('aftership:processException');
const debugRateLimiting = debug('aftership:setRateLimiting');

const TIMEOUT = 50000;

interface RequestConfig {
  method: Method;
  url: string;
}

/**
 * API request interface
 */
export interface Request {
  /**
   * Make the request to AfterShip API
   * @param config the config of request (f.e. url, method)
   * @param data data
   */
  makeRequest<T, R>(
    { url, method }: RequestConfig,
    data?: T,
  ): Promise<AftershipResponse<R>>;
}

/**
 * The implementation of API request
 */
export class ApiRequestImpl implements Request {
  private app: any;
  private apiKey: string;
  private endpoint: string;

  constructor(app: any, apiKey: string, endpoint: string) {
    this.app = app;
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  /**
   * Make a request call to AfterShip API
   * @param config the config of request (f.e. url, method)
   * @param data data
   */
  public makeRequest<T, R>(
    { url, method }: RequestConfig,
    data?: T,
  ): Promise<AftershipResponse<R>> {
    debugMakeRequest('config %o', {
      url,
      method,
      apiKey: this.apiKey,
    });

    const request = axios.request({
      url,
      method,
      baseURL: this.endpoint,
      headers: { 'aftership-api-key': this.apiKey },
      data: data !== undefined ? { ...data } : null,
      timeout: TIMEOUT,
      validateStatus: (status) => {
        return status <= 504;
      },
    });

    // return Promise
    return new Promise((resolve, reject) => {
      request
        .then(({ headers, data }) => {
          this.setRateLimiting(this.app, headers);
          resolve(this.processResponse(data));
        })
        .catch(e => reject(this.processException(e)));
    });
  }

  private processResponse<T>(data: any): AftershipResponse<T> {
    const meta: Meta = { code: data['meta']['code'] };
    const message = data['meta']['message'];
    const type = data['meta']['type'];

    if (message) {
      meta.message = message;
    }

    if (type) {
      meta.type = type;
    }

    debugProcessResponse('body %o', { meta, data: data['data'] });

    return {
      meta,
      data: data['data'],
    };
  }

  private processException(error: any): Error {
    debugProcessException('UnexpectedError %s', error.message);
    return new Error(error.message);
  }

  private setRateLimiting(app: any, data: any): void {
    if (!data) {
      return;
    }

    const rateLimiting = {
      reset: data['x-ratelimit-reset'],
      limit: data['x-ratelimit-limit'],
      remaining: data['x-ratelimit-remaining'],
    };

    debugRateLimiting('rateLimiting %o', rateLimiting);
    app.setRateLimiting(rateLimiting);
  }
}
