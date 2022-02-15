/**
 * Estimated Delivery Date information.
 */
export interface EstimatedDeliveryDate {

  /**
   * The estimated arrival date of the shipment.
   */
  estimated_delivery_date?: string;

  /**
   * The reliability of the estimated delivery date based on the trend of the transit time
   * for the similar delivery route and the carrier's delivery performance
   * range from 0.0 to 1.0 (Beta feature).
   */
  confidence_score?: number;

  /**
   * Earliest estimated delivery date of the shipment.
   */
  estimated_delivery_date_min?: string;

  /**
   *  Latest estimated delivery date of the shipment.
   */
  estimated_delivery_date_max?: string;
}
