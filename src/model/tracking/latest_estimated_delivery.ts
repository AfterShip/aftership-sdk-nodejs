export interface LatestEstimatedDelivery {
  /**
   * The format of the EDD. Either a single date or a date range.
   */
  type?: string;

  /**
   * The source of the EDD. Either the carrier, AfterShip AI, or based on your custom EDD settings.
   */
  source?: string;

  /**
   * The latest EDD time.
   */
  datetime?: string;

  /**
   * For a date range EDD format, the date and time for the lower end of the range.
   */
  datetime_min?: string;

  /**
   * For a date range EDD format, the date and time for the upper end of the range.
   */
  datetime_max?: string;
}
