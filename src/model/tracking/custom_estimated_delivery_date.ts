export interface CustomEstimatedDeliveryDate {
  /**
   * The format of the EDD. Either a single date or a date range.
   */
  type?: string;

  /**
   * The specific EDD date.
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
