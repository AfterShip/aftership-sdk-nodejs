export interface EstimatedPickup {
  /**
   * The local order time of the package.
   */
  order_time?: string;

  /**
   * Order cut off time. AfterShip will set 18:00:00 as the default value.
   */
  order_cutoff_time?: string;

  /**
   * Operating days in a week. Number refers to the weekday.
   * E.g., [1,2,3,4,5] means operating days are from Monday to Friday.
   * AfterShip will set [1,2,3,4,5] as the default value.
   */
  business_days?: number[];

  order_processing_time?: OrderProcessingTime;

  /**
   * The local pickup time of the package.
   */
  pickup_time?: string;
}

export interface OrderProcessingTime {
  /**
   * Processing time of an order, from being placed to being picked up.
   * Only support day as value now. AfterShip will set day as the default value.
   */
  unit?: string;

  /**
   * Processing time of an order, from being placed to being picked up.
   * AfterShip will set 0 as the default value.
   */
  value?: number;
}
