import axios, { Method } from 'axios';
import debug from 'debug';

const debugMakeRequest = debug('aftership:makeRequest');
const debugProcessResponse = debug('aftership:processResponse');
const debugProcessException = debug('aftership:processException');
const debugRateLimiting = debug('aftership:setRateLimiting');

export const DEFAULT_ENDPOINT = 'https://api.aftership.com/v4';

export const DEFAULT_API_KEY = process.env['AFTERSHIP_API_KEY'];

export const TIMEOUT = 50000;

export const makeRequest = (app: any) => ({ url, method }: Entity) => (headers: AftershipHeaders) =>
  (data: any = {}) => (callback?: Function): any => {
    debugMakeRequest(
      'config %o', { url, method, apiKey: headers.apiKey, ...data, callback: typeof callback });

    const request = axios.request({
      url,
      method,
      baseURL: `${DEFAULT_ENDPOINT}`,
      headers: { 'aftership-api-key': headers.apiKey },
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
          setRateLimiting(app, headers);
          callback(null, processResponse(data));
        })
        .catch(e => callback(processException(e)));
      return;
    }
    debugMakeRequest('in Promise.........');

    return new Promise((resolve, reject) => {
      request
        .then(({ headers, data }) => {
          setRateLimiting(app, headers);
          resolve(processResponse(data));
        })
        .catch(e => reject(processException(e)));
    });
  };

export const processResponse = (data: any): Envelope => {
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
};

export const processException = (error: any) => {
  debugProcessException('UnexpectedError %s', error.message);
  return new Error(error.message);
};

export const setRateLimiting = (app: any, data: any) => {

  const rateLimiting = {
    reset: data['X-RateLimit-Reset'],
    limit: data['X-RateLimit-Limit'],
    remaining: data['X-RateLimit-Remaining'],
  };

  debugRateLimiting('rateLimiting %o', rateLimiting);
  app.setRateLimiting(rateLimiting);
};

export interface Meta {
  code: number;
  message?: string;
  type?: string;
}

export interface Envelope {
  meta: Meta;
  data?: any;
}

export interface Entity {
  method: Method;
  url: AftershipUrl;
}

export interface AftershipHeaders {
  apiKey: string;
}

export enum AftershipUrl {
  Couriers = '/couriers',
  CouriersAll = '/couriers/all',
  Detect = '/couriers/detect',
}
