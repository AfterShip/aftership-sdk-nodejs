
/**
 * Tracking query params object 
 */
export interface TrackingQueryParams {

  /**
   * List of fields to include in the response. 
   * Use comma for multiple values. Fields to include: 
   * tracking_postal_code,tracking_ship_date,tracking_account_number,tracking_key,
   * tracking_origin_country,tracking_destination_country,tracking_state,title,order_id,
   * tag,checkpoints,checkpoint_time, message, country_name
   * Defaults: none, Example: title,order_id
   */
  fields?: string;

  /**
   * Support Chinese to English translation for china-ems  and  china-post  only (Example: en)
   */
  lang?: string;
}