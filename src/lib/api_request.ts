import axios, { Method } from 'axios';
import debug from 'debug';
import { v4 as uuidv4 }  from 'uuid';
import { AftershipResponse, Meta } from '../model/aftership_response';
import { AfterShip } from '../index';
import { getSdkVersion } from './util';

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
export interface ApiRequest {
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
export class ApiRequestImplementation implements ApiRequest {
  private readonly app: AfterShip;

  constructor(app: AfterShip) {
    this.app = app;
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
      apiKey: this.app.apiKey,
    });

    const request_id = uuidv4();
    const headers = {
      'aftership-api-key': this.app.apiKey,
      'Content-Type': 'application/json',
      'x-request-id': request_id,
      'User-Agent': `${this.app.user_agent_prefix}/${request_id}`,
      'x-aftership-agent': `nodejs-sdk-${getSdkVersion()}`,
    };

    const request = axios.request({
      url,
      method,
      headers,
      baseURL: this.app.endpoint,
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

  private setRateLimiting(app: AfterShip, data: any): void {
    if (!data) {
      return;
    }

    const rateLimiting = {
      reset: data['x-ratelimit-reset'],
      limit: data['x-ratelimit-limit'],
      remaining: data['x-ratelimit-remaining'],
    };

    debugRateLimiting('rateLimiting %o', rateLimiting);
    app.rate_limit = rateLimiting;
  }
}
