import axios from 'axios';
import debug from 'debug';
import { Entity, Envelope, Meta } from './util';

const debugMakeRequest = debug('aftership:makeRequest');
const debugProcessResponse = debug('aftership:processResponse');
const debugProcessException = debug('aftership:processException');
const debugRateLimiting = debug('aftership:setRateLimiting');

const TIMEOUT = 50000;

/**
 * API request interface
 */
export interface IRequest {
  /**
   * Make the request to AfterShip API
   * @param urlAndMethod request url and method
   * @param data data
   * @param callback optional, return Promise if callback is not define
   */
  makeRequest(
    { url, method }: Entity,
    data: any,
    callback?: Function,
  ): void | Promise<any>;
}

/**
 * API Request class
 */
export class ApiRequest implements IRequest {
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
   * @param param0 request url and method
   * @param data data
   * @param callback optional, return Promise if callback is not defined
   */
  public makeRequest(
    { url, method }: Entity,
    data: any = {},
    callback?: Function,
  ): void | Promise<any> {
    debugMakeRequest('config %o', {
      url,
      method,
      apiKey: this.apiKey,
      ...data,
      callback: typeof callback,
    });

    const request = axios.request({
      url,
      method,
      baseURL: this.endpoint,
      headers: { 'aftership-api-key': this.apiKey },
      data: { ...data },
      timeout: TIMEOUT,
      validateStatus: (status) => {
        return status <= 504;
      },
    });

    if (callback !== undefined && typeof callback === 'function') {
      debugMakeRequest('in callback..........');

      request
        .then(({ headers, data }) => {
          this.setRateLimiting(this.app, headers);
          callback(null, this.processResponse(data));
        })
        .catch(e => callback(this.processException(e)));
      return;
    }
    debugMakeRequest('in Promise.........');

    // return Promise, if callback is not define
    return new Promise((resolve, reject) => {
      request
        .then(({ headers, data }) => {
          this.setRateLimiting(this.app, headers);
          resolve(this.processResponse(data));
        })
        .catch(e => reject(this.processException(e)));
    });
  }

  private processResponse(data: any): Envelope {
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
