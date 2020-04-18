/**
 * The response of AfterShip API calls
 */
export interface AftershipResponse<T> {
  /**
   * The meta key is used to communicate extra information about the response to the developer.
   */
  meta: Meta;

  /**
   * The data key is the meat of the response. It may be a list of results,
   * but either way this is where you'll find the data you requested.
   */
  data?: T;
}

export interface Meta {
  code: number;
  message?: string;
  type?: string;
}
