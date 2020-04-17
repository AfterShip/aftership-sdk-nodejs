import { Courier } from './courier';
import { CourierTracking } from './courier_tracking';

/**
 * The response of couriers detect request
 */
export interface CourierDetectList {
  /**
   * Total number of matched couriers
   */
  total: number;

  /**
   * Hash describes the tracking information.
   */
  tracking: CourierTracking[];

  /**
   * A list of matched couriers based on tracking number format.
   */
  couriers: Courier[];
}
