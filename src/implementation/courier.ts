import { ApiRequest } from '../lib/api_request';
import { CourierEndpoint } from '../endpoint/courier_endpoint';
import { CourierList } from '../model/courier/courier_list';
import { CourierDetectRequest } from '../model/courier/courier_detect_request';
import { CourierDetectList } from '../model/courier/courier_detect_list';

/**
 * The implementation of the courier endpoint request
 */
export class CourierImplementation implements CourierEndpoint {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  /**
   * Return a list of couriers activated at your AfterShip account
   */
  public listCouriers(): Promise<CourierList> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: '/couriers' },
    );
  }

  /**
   * Return a list of all couriers
   */
  public listAllCouriers(): Promise<CourierList> {
    return this.request.makeRequest<null, CourierList>(
      { method: 'GET', url: '/couriers/all' },
    );
  }

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   */
  public detectCouriers(data: CourierDetectRequest): Promise<CourierDetectList> {
    return this.request.makeRequest<CourierDetectRequest, CourierDetectList>(
      { method: 'POST', url: '/couriers/detect' },
      data,
    );
  }
}
