import { AftershipError } from '../../error/error';
import { ErrorEnum } from '../..//error/error_enum';

/**
 * The request object of couriers detect
 */
export class CourierDetectRequest {
  /**
   * Tracking Object.
   */
  public tracking: CourierDetectTracking;

  constructor(tracking_number: string) {
    this.tracking = new CourierDetectTracking(tracking_number);
  }
}

/**
 * The tracking object of couriers detect
 */
export class CourierDetectTracking {
  /**
   * Tracking number.
   */
  public tracking_number: string;

  /**
   * The postal code of receiver's address. Required by some couriers, such asdeutsch-post
   */
  public tracking_postal_code: string;

  /**
   * Shipping date in YYYYMMDD format. Required by some couriers, such asdeutsch-post
   */
  public tracking_ship_date: string;

  /**
   * Key of the shipment for a specific courier. Required by some couriers, such assic-teliway
   */
  public tracking_key: string;

  /**
   * Destination Country of the shipment for a specific courier. Required by some couriers, such aspostnl-3s
   */
  public tracking_destination_country: string;

  /**
   * If not specified, Aftership will automatically detect the courier based on the tracking number format
   * and your selected couriers. Use array or comma separated to input a list of couriers for auto detect.
   */
  public slug: string | string[];

  constructor(tracking_number: string) {
    if (tracking_number === undefined || tracking_number === '') {
      // Verify tracking_number
      throw AftershipError.getSdkError(
        ErrorEnum.constructorInvalidTrackingNumber,
        tracking_number,
      );
    }

    this.tracking_number = tracking_number;
    this.tracking_postal_code = '';
    this.tracking_ship_date = '';
    this.tracking_key = '';
    this.tracking_destination_country = '';
    this.slug = '';
  }
}
