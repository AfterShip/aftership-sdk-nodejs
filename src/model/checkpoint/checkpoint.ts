import { DeliveryStatus } from '../tracking/delivery_status';

/**
 * checkpoint information.
 */
export interface CheckPoint {

  /**
   * Date and time of the tracking created.
   */
  created_at?: string;

  /**
   * The unique code of courier for this checkpoint message.
   */
  slug?: string;

  /**
   * Date and time of the checkpoint, provided by courier.
   * Value may be:YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, or YYYY-MM-DDTHH:MM:SS+TIMEZONE
   */
  checkpoint_time?: string;

  /**
   * 	Location info provided by carrier (if any)
   */
  location?: string;

  /**
   * City info provided by carrier (if any)
   */
  city?: string;

  /**
   * State info provided by carrier (if any)
   */
  state?: string;

  /**
   * Deprecated as of March 2013
   */
  coordinates?: [string];

  /**
   * Country ISO Alpha-3 (three letters) of the checkpoint
   */
  country_iso3?: string;

  /**
   * Country name of the checkpoint, may also contain other location info.
   */
  country_name?: string;

  /**
   * CheckPoint message
   */
  message?: string;

  /**
   * Current status of checkpoint.
   */
  tag?: DeliveryStatus;

  /**
   * Current subtag of checkpoint.
   */
  subtag?: string;

  /**
   * Normalized checkpoint message.
   */
  subtag_message?: string;

  /**
   * ocation info (if any)
   */
  zip?: string;

  /**
   * CheckPoint status provided by courier (if any)
   */
  raw_tag?: string;
}
