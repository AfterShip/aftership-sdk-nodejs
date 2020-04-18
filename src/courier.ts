import { Request } from './api_request';
import { AftershipResponse } from './models/response';
import { CourierList, CourierDetectRequest, CourierDetectList } from './models/couriers';
import { CourierEndpoint } from './method';

/**
 * The implementation of the courier endpoint request
 */
export class CourierImpl implements CourierEndpoint {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  /**
   * Return a list of couriers activated at your AfterShip account
   */
  public listCouriers(): Promise<AftershipResponse<CourierList>> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: '/couriers' },
    );
  }

  /**
   * Return a list of all couriers
   */
  public listAllCouriers(): Promise<AftershipResponse<CourierList>> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: '/couriers/all' },
    );
  }

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   */
  public detectCouriers(data: CourierDetectRequest): Promise<AftershipResponse<CourierDetectList>> {
    return this.request.makeRequest<CourierDetectRequest, CourierDetectList>(
      { method: 'POST', url: '/couriers/detect' },
      data,
    );
  }
}
