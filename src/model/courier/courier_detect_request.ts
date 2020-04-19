import { AftershipError } from '../../error/error';
import { ErrorEnum } from '../../error/error_enum';

/**
 * The request object of couriers detect
 */
export class CourierDetectRequest {
  /**
   * Tracking Object.
   */
  public tracking: CourierDetectTracking;

  /**
   * CourierDetectRequest constructor
   * @param tracking tracking object, the tracking_number field is required.
   */
  constructor(tracking: CourierDetectTracking) {
    if (tracking === undefined || tracking.tracking_number === undefined
      || tracking.tracking_number === '') {
      // Verify tracking_number
      throw AftershipError.getSdkError(
        ErrorEnum.constructorInvalidTrackingNumber,
        tracking,
      );
    }

    this.tracking = tracking;
  }
}

/**
 * The tracking object in couriers detect request
 */
export interface CourierDetectTracking {
  /**
   * Tracking number. (Required)
   */
  tracking_number: string;

  /**
   * The postal code of receiver's address. Required by some couriers, such asdeutsch-post
   */
  tracking_postal_code?: string;

  /**
   * Shipping date in YYYYMMDD format. Required by some couriers, such asdeutsch-post
   */
  tracking_ship_date?: string;

  /**
   * Key of the shipment for a specific courier. Required by some couriers, such assic-teliway
   */
  tracking_key?: string;

  /**
   * Destination Country of the shipment for a specific courier. Required by some couriers, such aspostnl-3s
   */
  tracking_destination_country?: string;

  /**
   * If not specified, Aftership will automatically detect the courier based on the tracking number format
   * and your selected couriers. Use array or comma separated to input a list of couriers for auto detect.
   */
  slug?: string | string[];
}
