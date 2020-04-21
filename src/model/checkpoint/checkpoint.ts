import { Tag } from '../tracking/tracking'
/**
 * checkpoint information. 
 */
export interface Checkpoint {

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
  coordinates?: Array<any>;

  /**
   * Country ISO Alpha-3 (three letters) of the checkpoint
   */
  country_iso3?: string;

  /**
   * Country name of the checkpoint, may also contain other location info.
   */
  country_name?: string;

  /**
   * Checkpoint message
   */
  message?: string;

  /**
   * Current status of checkpoint.
   */
  tag?: Tag;

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
   * Checkpoint status provided by courier (if any)

   */
  raw_tag?: string;
}

