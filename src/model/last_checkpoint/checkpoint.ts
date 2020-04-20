/**
 * CheckPoint Object
 */
export interface CheckPoint {
  /**
   * Date and time of the tracking created.
   */
  created_at: Date;

  /**
   * The unique code of courier for this checkpoint message.
   */
  slug: string;

  /**
   * Date and time of the checkpoint, provided by courier. Value may be:
   * YYYY-MM-DD
   * YYYY-MM-DDTHH:MM:SS
   * YYYY-MM-DDTHH:MM:SS+TIMEZONE
   */
  checkpoint_time: string;

  /**
   * Location info provided by carrier (if any)
   */
  location: string;

  /**
   * City info provided by carrier (if any)
   */
  city: string;

  /**
   * State info provided by carrier (if any)
   */
  state: string;

  /**
   * Deprecated as of March 2013
   */
  coordinates: string[];

  /**
   * Country ISO Alpha-3 (three letters) of the checkpoint
   */
  country_iso3: string;

  /**
   * Country name of the checkpoint, may also contain other location info.
   */
  country_name: string;

  /**
   * Checkpoint message
   */
  message: string;

  /**
   * Current status of checkpoint. Values include:
   * Pending, InfoReceived, InTransit, OutForDelivery, AttemptFail, Delivered, AvailableForPickup, Exception, Expired
   * See tag definition: https://docs.aftership.com/api/4/delivery-status
   */
  tag: string;

  /**
   * Current subtag of checkpoint.
   * See subtag definition: https://help.aftership.com/hc/en-us/articles/360007823253
   */
  subtag: string;

  /**
   * Normalized checkpoint message.
   * See subtag message definition: https://help.aftership.com/hc/en-us/articles/360007823253
   */
  subtag_message: string;

  /**
   * Location info (if any)
   */
  zip: string;

  /**
   * Checkpoint status provided by courier (if any)
   */
  raw_tag: string;
}
