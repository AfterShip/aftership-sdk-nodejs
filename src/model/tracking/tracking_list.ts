import { Tracking } from '../tracking/tracking';
/**
 * tracking results.
 */
export interface TrackingList {

  /**
   * Number of trackings each page contain. (Default: 100)
   */
  limit?: number;

  /**
   * Total number of matched trackings, max. number is 10,000
   */
  count?: number;

  /**
   * Page to show. (Default: 1)
   */
  page?: number;

  /**
   * Searching keyword
   */
  keyword?: string;

  /**
   * Unique courier code Use comma for multiple values. 
   */
  slug?: string;

  /**
   * Origin country/region of trackings. Use ISO Alpha-3 (three letters). Use comma for multiple values. (Example: USA, HKG)
   */
  origin?: [string];

  /**
   * Destination country/region of trackings. Use ISO Alpha-3 (three letters). Use comma for multiple values. (Example: USA, HKG)
   */
  destination?: [string];

  /**
   * Current status of tracking. 
   */
  tag?: string;

  /**
   * Start date and time of trackings created. AfterShip only stores data of 90 days.
   */
  created_at_min?: string;

  /**
   * End date and time of trackings created.
   */
  created_at_max?: string;

  /**
   * Date and time the tracking was last updated.
   */
  last_updated_at?: string;

  /**
   * Whether or not the shipment is returned to sender.
   */
  return_to_sender?: boolean[];

  /**
   * Destination country/region of the tracking detected from the courier.
   */
  courier_destination_country_iso3?: string[];

  /**
   * Array of Hash describes the tracking information.
   */
  trackings?: [Tracking['tracking']];
}
