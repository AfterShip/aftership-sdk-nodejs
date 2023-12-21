import { DeliveryStatus } from './delivery_status';

/**
 * Tracking list query params object
 */
export interface MultiTrackingsQueryParams {

  /**
   * Page to show. (Default: 1)
   */
  page?: number;

  /**
   * Number of trackings each page contain. (Default: 100, Max: 200)
   */
  limit?: number;

  /**
   * Search the content of the tracking record fields:
   * tracking_number,  title,  order_id,  customer_name,  custom_fields,  order_id,  emails,  smses
   */
  keyword?: string;

  /**
   * Tracking number of shipments. Use comma to separate multiple values
   * (Example: RA123456789US,LE123456789US)
   */
  tracking_numbers?: string;

  /**
   * Unique courier code Use comma for multiple values. (Example: dhl,ups,usps)
   */
  slug?: string;

  /**
   * Total delivery time in days.
   * - Difference of 1st checkpoint time and delivered time for delivered shipments
   * - Difference of 1st checkpoint time and current time for non-delivered shipments
   * Value as 0 for pending shipments or delivered shipment with only one checkpoint.
   */
  delivery_time?: number;

  /**
   * Origin country of trackings. Use ISO Alpha-3 (three letters). Use comma for multiple values. (Example: USA,HKG)
   */
  origin?: string;

  /**
   * Destination country of trackings. Use ISO Alpha-3 (three letters).
   * Use comma for multiple values. (Example: USA,HKG)
   */
  destination?: string;

  /**
   * Current status of tracking.
   */
  tag?: DeliveryStatus;

  /**
   * Start date and time of trackings created. AfterShip only stores data of 90 days.
   * (Defaults: 30 days ago, Example: 2013-03-15T16:41:56+08:00)
   */
  created_at_min?: string;

  /**
   * End date and time of trackings created.
   * (Defaults: now, Example: 2013-04-15T16:41:56+08:00)
   */
  created_at_max?: string;

  /**
   * Start date and time of trackings updated.
   * (Example: 2013-04-15T16:41:56+08:00)
   */
  updated_at_min?: string;

  /**
   * End date and time of trackings updated. (Example: 2013-04-15T16:41:56+08:00)
   */
  updated_at_max?: string;

  /**
   * List of fields to include in the response.
   * Use comma for multiple values. Fields to include: title,  order_id,  tag,
   * checkpoints,  checkpoint_time,  message,  country_name
   * Defaults: none, Example: title,order_id
   */
  fields?: string;

  /**
   * Default: '' / Example: 'en'
   * Support Chinese to English translation for  china-ems  and  china-post  only
   */
  lang?: string;

  /**
   * Tracking last updated at
   * (Example: 2013-03-15T16:41:56+08:00)
   */
  last_updated_at?: string;

  /**
   * Select return to sender, the value should be true or false,
   * with optional comma separated.
   */
  return_to_sender?: string;

  /**
   * Destination country of trackings returned by courier.
   * Use ISO Alpha-3 (three letters).
   * Use comma for multiple values. (Example: USA,HKG)
   */
  courier_destination_country_iso3?: string;

  /**
   * Tags you added to your shipments to help categorize and filter them easily.
   * Use a comma to separate multiple values (Example: a,b)
   */
  shipment_tags?: string;

  /**
   * Total delivery time in days.
   */
  transit_time?: string;

}
