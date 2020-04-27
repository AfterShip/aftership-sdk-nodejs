export interface AftershipOption {
  /**
   * AfterShip endpoint, default 'https://api.aftership.com/v4'
   */
  endpoint: string;

  /**
   *  Prefix of User-Agent in headers, default 'aftership-sdk-nodejs'
   */
  user_agent_prefix: string;
}
