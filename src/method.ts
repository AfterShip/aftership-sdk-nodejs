import { AftershipResponse } from './models/response';
import { CourierList, CourierDetectRequest, CourierDetectList } from './models/couriers';

/**
 * Get a list of AfterShip supported couriers.
 */
export interface CourierEndpoint {
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
