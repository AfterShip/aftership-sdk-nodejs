export interface NextCourier {
  /**
   * Unique code of courier
   */
  slug?: string;

  /**
   * Tracking number
   */
  tracking_number?: string;

  /**
   * Source of next couriers
   */
  source?: string;
}
