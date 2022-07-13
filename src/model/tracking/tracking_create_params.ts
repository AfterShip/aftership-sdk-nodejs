import { AftershipError } from '../../error/error';
import { ErrorEnum } from '../../error/error_enum';
import { DeliveryType } from './delivery_type';

/**
 * The request object of tracking create
 */

export class TrackingCreateParams {
  /**
   * Tracking Object.
   */
  public tracking: TrackingCreate;

  /**
   * TrackingCreateParams constructor
   * @param tracking tracking object, the tracking_number field is required.
   */
  constructor(tracking: TrackingCreate) {
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
 * The tracking object in tracking create request
 */
export interface TrackingCreate {
  /**
   * Tracking number. (Required)
   */
  tracking_number: string;

  /**
   * Unique code of each courier.
   * Provide a single courier or array for a list of couriers.
   * If you do not specify a slug, Aftership will automatically detect
   * the courier based on the tracking number format and your selected couriers.
   * Get a list of courier slug using GET /couriers
   */
  slug?: string | [string];

  /**
   * Title of the tracking. Default value astracking_number
   */
  title?: string;

  /**
   * Text field for order ID
   */
  order_id?: string;

  /**
   * Text field for order path
   */
  order_id_path?: string;

  /**
   * Custom fields that accept a hash with string, boolean or number fields
   */
  custom_fields?: Object;

  /**
   * Enter ISO 639-1 Language Code to specify the store, customer or order language.
   */
  language?: string;

  /**
   * Promised delivery date of an order inYYYY-MM-DDformat.
   */
  order_promised_delivery_date?: string;

  /**
   * Shipment delivery type
   */
  delivery_type?: DeliveryType;

  /**
   * Shipment pickup location for receiver
   */
  pickup_location?: string;

  /**
   * Shipment pickup note for receiver
   */
  pickup_note?: string;

  /**
   * Account number of the shipper for a specific courier. Required by some couriers, such asdynamic-logistics
   */
  tracking_account_number?: string;

  /**
   * Origin Country of the shipment for a specific courier. Required by some couriers, such asdhl
   */
  tracking_origin_country?: string;
  /**
   * Destination Country of the shipment for a specific courier. Required by some couriers, such aspostnl-3s
   */
  tracking_destination_country?: string;

  /**
   * Key of the shipment for a specific courier. Required by some couriers, such assic-teliway
   */
  tracking_key?: string;

  /**
   * The postal code of receiver's address. Required by some couriers, such asdeutsch-post
   */
  tracking_postal_code?: string;

  /**
   * Shipping date inYYYYMMDDformat. Required by some couriers, such asdeutsch-post
   */
  tracking_ship_date?: string;

  /**
   * Located state of the shipment for a specific courier. Required by some couriers, such asstar-track-courier
   */
  tracking_state?: string;

  /**
   * Apple iOS device IDs to receive the push notifications.
   * Accept either array or comma separated as input.
   */
  ios?: string | [string];

  /**
   * Google cloud message registration IDs to receive the push notifications.
   * Accept either array or comma separated as input.
   */
  android?: string | [string];

  /**
   * Email address(es) to receive email notifications.
   * Accept either array or comma separated as input.
   */
  emails?: string | [string];

  /**
   * Phone number(s) to receive sms notifications.
   * Enter+ andarea code before phone number.
   * Accept either array or comma separated as input.
   */
  smses?: string | [string];

  /**
   * Customer name of the tracking.
   */
  customer_name?: string;

  /**
   * Enter ISO Alpha-3 (three letters) to specify the origin of the shipment (e.g. USA for United States).
   */
  origin_country_iso3?: string;

  /**
   * Enter ISO Alpha-3 (three letters) to specify the destination of the shipment (e.g. USA for United States).
   * If you use postal service to send international shipments, AfterShip will automatically
   * get tracking results at destination courier as well.
   */
  destination_country_iso3?: string;

  /**
   * Text field for the note
   */
  note?: string;

  /**
   * Slug group is a group of slugs which belong to same courier.
   * For example, when you inpit "fedex-group" as slug_group,
   * AfterShip will detect the tracking with "fedex-uk", "fedex-fims",
   * and other slugs which belong to "fedex".
   * It cannot be used with slug at the same time.
   */
  slug_group?: string;

  /**
   * Date and time of the order created
   */
  order_date?: string;

  /**
   * Text field for order number
   */
  order_number?: string;

  /**
   * The carrier’s shipment type. When you input this field, AfterShip will not get updates from the carrier.
   */
  shipment_type?: string;
}
