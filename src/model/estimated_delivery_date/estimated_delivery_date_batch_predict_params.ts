import { Address } from './address';
import { Weight } from './weight';
import { EstimatedPickup } from './estimated_pickup';

/**
 * The request object of batch predict
 */
export class EstimatedDeliveryDateBatchPredictParams {
  /**
   * EstimatedDeliveryDate Array Object.
   */
  public estimated_delivery_dates: EstimatedDeliveryDate[];

  /**
   * EstimatedDeliveryDateBatchPredictParams constructor
   * @param estimatedDeliveryDates EstimatedDeliveryDate array object
   */
  constructor(estimatedDeliveryDates: EstimatedDeliveryDate[]) {
    this.estimated_delivery_dates = estimatedDeliveryDates;
  }
}

/**
 * The estimatedDeliveryDate object for batch predict request
 */
export interface EstimatedDeliveryDate {
  /**
   * AfterShip's unique code of courier.
   * Please refer to https://track.aftership.com/couriers/download.
   */
  slug?: string;

  /**
   * Shipping and delivery options provided by the carrier.
   */
  service_type_name?: string;

  /**
   * The location from where the package is picked up by the carrier to be delivered to the final destination.
   */
  origin_address?: Address;

  /**
   * The final destination of the customer where the delivery will be made.
   */
  destination_address?: Address;

  /**
   * AfterShip uses this object to calculate the total weight of the order.
   */
  weight?: Weight;

  /**
   * The number of packages.
   */
  package_count?: number;

  /**
   * The local pickup time of the package.
   * Either `pickup_time` or `estimated_pickup` is required.
   */
  pickup_time?: string;

  /**
   * The local pickup time of the package.
   * Either `pickup_time` or `estimated_pickup` is required.
   */
  estimated_pickup?: EstimatedPickup;

  /**
   * The estimated arrival date of the shipment, provided by AfterShip.
   */
  estimated_delivery_date?: string;

  /**
   * The earliest estimated delivery date of the shipment, provided by AfterShip.
   */
  estimated_delivery_date_min?: string;

  /**
   * The latest estimated delivery date of the shipment, provided by AfterShip.
   */
  estimated_delivery_date_max?: string;
}
