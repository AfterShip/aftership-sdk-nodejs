import { Courier } from './courier';

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
  tracking: string;

  /**
   * A list of matched couriers based on tracking number format.
   */
  couriers: Courier[];
}
