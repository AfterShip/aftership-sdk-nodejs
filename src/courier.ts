import { AftershipResource } from './resources';
import { Request } from './api_request';
import { AftershipResponse } from './models/response';
import { CourierList } from './models/couriers/courier_list';
import { CourierDetectRequest } from './models/couriers/courier_detect_request';
import { CourierDetectList } from './models/couriers/courier_detect_list';

/**
 * Get a list of AfterShip supported couriers.
 */
export interface Courier {
  /**
   * Return a list of couriers activated at your AfterShip account
   */
  listCouriers(): Promise<AftershipResponse<CourierList>>;

  /**
   * Return a list of all couriers
   */
  listAllCouriers(): Promise<AftershipResponse<CourierList>>;

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   */
  detectCouriers(data: CourierDetectRequest): Promise<AftershipResponse<CourierDetectList>>;
}

/**
 * The implementation of the courier
 */
export class CourierImpl implements Courier {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  /**
   * Return a list of couriers activated at your AfterShip account
   */
  public listCouriers(): Promise<AftershipResponse<CourierList>> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: AftershipResource.Couriers },
    );
  }

  /**
   * Return a list of all couriers
   */
  public listAllCouriers(): Promise<AftershipResponse<CourierList>> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: AftershipResource.CouriersAll },
    );
  }

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   */
  public detectCouriers(data: CourierDetectRequest): Promise<AftershipResponse<CourierDetectList>> {
    return this.request.makeRequest<CourierDetectRequest, CourierDetectList>(
      { method: 'POST', url: AftershipResource.CouriersDetect },
      data,
    );
  }
}
