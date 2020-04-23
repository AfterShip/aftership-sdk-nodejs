import { CourierList } from '../model/courier/courier_list';
import { CourierDetectRequest } from '../model/courier/courier_detect_request';
import { CourierDetectList } from '../model/courier/courier_detect_list';

/**
 * Get a list of AfterShip supported couriers.
 */
export interface CourierEndpoint {
  /**
   * Return a list of couriers activated at your AfterShip account
   */
  listCouriers(): Promise<CourierList>;

  /**
   * Return a list of all couriers
   */
  listAllCouriers(): Promise<CourierList>;

  /**
   * Return a list of matched couriers based on tracking number format and selected couriers or a list of couriers
   * @param data data
   */
  detectCouriers(
    data: CourierDetectRequest,
  ): Promise<CourierDetectList>;
}
