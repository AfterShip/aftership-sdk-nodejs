import { Tag } from '../tracking/tracking'
/**
 * Tracking list query params object
 */
export interface TrackingsQueryParams {

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
   * Destination country of trackings. Use ISO Alpha-3 (three letters). Use comma for multiple values. (Example: USA,HKG)
   */
  destination?: string;

  /**
   * Current status of tracking. 
   */
  tag?: Tag;

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
   * List of fields to include in the response. 
   * Use comma for multiple values. Fields to include: title,  order_id,  tag,  checkpoints,  checkpoint_time,  message,  country_name
   * Defaults: none, Example: title,order_id
   */
  fields?: string;

  /**
   * Default: '' / Example: 'en'
   * Support Chinese to English translation for  china-ems  and  china-post  only
   */
  lang?: string;
}