import { AftershipResource } from './resources';
import { IRequest } from './api_request';

/**
 * Get a list of AfterShip supported couriers.
 */
export interface ICourier {
  /**
   * Return a list of couriers activated at your AfterShip account
   * @param callback optional, return Promise if callback is not defined
   */
  listCouriers(callback?: Function): void | Promise<any>;

  /**
   * Return a list of all couriers
   * @param callback optional, return Promise if callback is not defined
   */
  listAllCouriers(callback?: Function): void | Promise<any>;

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   * @param callback optional, return Promise if callback is not defined
   */
  detectCouriers(data: any, callback?: Function): void | Promise<any>;
}

export class Courier implements ICourier {
  private request: IRequest;

  constructor(request: IRequest) {
    this.request = request;
  }

  /**
   * Return a list of couriers activated at your AfterShip account
   * @param callback optional, return Promise if callback is not defined
   */
  public listCouriers(callback?: Function): void | Promise<any> {
    return this.request.makeRequest(
      { method: 'GET', url: AftershipResource.Couriers },
      {},
      callback,
    );
  }

  /**
   * Return a list of all couriers
   * @param callback optional, return Promise if callback is not defined
   */
  public listAllCouriers(callback?: Function): void | Promise<any> {
    return this.request.makeRequest(
      { method: 'GET', url: AftershipResource.CouriersAll },
      {},
      callback,
    );
  }

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   * @param callback optional, return Promise if callback is not defined
   */
  public detectCouriers(data: any, callback?: Function): void | Promise<any> {
    return this.request.makeRequest(
      { method: 'POST', url: AftershipResource.Detect },
      data,
      callback,
    );
  }
}
