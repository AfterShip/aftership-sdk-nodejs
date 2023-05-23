import { DeliveryType } from './delivery_type';
/**
 * Tracking update params object
 */
export interface TrackingUpdateParams {
  /**
   * Tracking Update Object.
   */
  tracking: TrackingUpdate;
}

interface TrackingUpdate {

  /**
   * Phone number(s) to receive sms notifications.
   */
  smses?: [string];

  /**
   * Email address(es) to receive email notifications.
   */
  emails?: [string];

  /**
   * Title of the tracking.
   */
  title?: string;

  /**
   * Customer name of the tracking.
   */
  customer_name?: string;

  /**
   * Text field for order ID
   */
  order_id?: string;

  /**
   * Text field for order path
   */
  order_id_path?: string;

  /**
   * Text field for order number
   */
  order_number?: string;

  /**
   * Date and time of the order created
   */
  order_date?: string;

  /**
   * Custom fields that accept a hash with string, boolean or number fields
   */
  custom_fields?: object;

  /**
   * Text field for the note
   */
  note?: string;

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
   * The carrier’s shipment type. When you input this field, AfterShip will not get updates from the carrier.
   */
  shipment_type?: string;

  /**
   * Unique code of each courier. Provide a single courier
   */
  slug?: string;

  /**
   * Additional field required by some carriers to retrieve the tracking info. The shipper’s carrier account number.
   */
  tracking_account_number?: string;

  /**
   * Additional field required by some carriers to retrieve the tracking info.
   * A type of tracking credential required by some carriers
   */
  tracking_key?: string;

  /**
   * Additional field required by some carriers to retrieve the tracking info.
   * The date the shipment was sent, using the format YYYYMMDD
   */
  tracking_ship_date?: string;

  /**
   * The ISO Alpha-3 code (3 letters) for the origin country/region.
   * E.g. USA for the United States.
   * This can help AfterShip with various functions like tracking,
   * carrier auto-detection and auto-correction, calculating an EDD, etc.
   * Also the additional field required by some carriers to retrieve
   * the tracking info. The origin country/region of the shipment
   */
  origin_country_iso3?: string;

  /**
   * The state of the sender’s address. This can help AfterShip with
   * various functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc
   */
  origin_state?: string;

  /**
   * The city of the sender’s address. This can help AfterShip with
   * various functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc
   */
  origin_city?: string;

  /**
   * The postal of the sender’s address. This can help AfterShip with
   * various functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc.
   */
  origin_postal_code?: string;

  /**
   * The sender address that the shipment is shipping from.
   * This can help AfterShip with various functions like tracking,
   * carrier auto-detection and auto-correction, calculating an EDD, etc
   */
  origin_raw_location?: string;

  /**
   * The ISO Alpha-3 code (3 letters) for the destination country/region.
   * E.g. USA for the United States. This can help AfterShip with various functions like tracking,
   * carrier auto-detection and auto-correction, calculating an EDD, etc.
   * Also the additional field required by some carriers to retrieve the
   * tracking info. The destination country/region of the shipment.
   */
  destination_country_iso3?: string;

  /**
   * The state of the recipient’s address. This can help AfterShip with various
   * functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc. Also the additional field required by some carriers
   * to retrieve the tracking info. The state/province of the recipient’s address.
   */
  destination_state?: string;

  /**
   * The city of the recipient’s address. This can help AfterShip with various
   * functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc
   */
  destination_city?: string;

  /**
   * The postal of the recipient’s address. This can help AfterShip with various functions
   * like tracking, carrier auto-detection and auto-correction, calculating an EDD, etc.
   * Also the additional field required by some carriers to retrieve the tracking info.
   * The postal code of the recipient’s address
   */
  destination_postal_code?: string;

  /**
   * The shipping address that the shipment is shipping to. This can help AfterShip with
   * various functions like tracking, carrier auto-detection and auto-correction,
   * calculating an EDD, etc.
   */
  destination_raw_location?: string;
}
