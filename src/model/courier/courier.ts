/**
 * Courier Object
 */
export interface Courier {
  /**
   * Unique code of courier
   */
  slug: string;

  /**
   * Name of courier
   */
  name: string;

  /**
   * Contact phone number of courier
   */
  phone: string;

  /**
   * Other name of courier
   */
  other_name: string;

  /**
   * Website link of courier
   */
  web_url: string;

  /**
   * The extra fields need for tracking, such as `tracking_account_number`, `tracking_postal_code`,
   *  `tracking_ship_date`, `tracking_key`, `tracking_destination_country`
   */
  required_fields: string[];

  /**
   * the extra fields which are optional for tracking. Basically it's the same as required_fields,
   *  but the difference is that only some of the tracking numbers require these fields.
   */
  optional_fields: string[];

  /**
   * Default language of tracking results
   */
  default_language: string;

  /**
   * Other supported languages
   */
  support_languages: string[];

  /**
   * Country code (ISO Alpha-3) where the courier provides service
   */
  service_from_country_iso3: string[];
}
