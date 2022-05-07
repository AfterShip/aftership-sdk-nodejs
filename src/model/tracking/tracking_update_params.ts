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
}
