import { Courier } from './courier';

/**
 * The response of courier list
 */
export interface CourierList {
  /**
   * Total number of couriers supported by AfterShip.
   */
  total: number;

  /**
   * Array of Hash describes the couriers information.
   */
  couriers: Courier[];
}
