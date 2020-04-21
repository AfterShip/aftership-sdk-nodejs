/**
 * RateLimit Object
 */
export interface RateLimit {
  /**
   * The unix timestamp when the rate limit will be reset.
   */
  reset: number | null;

  /**
   * The rate limit ceiling for your account per sec.
   */
  limit: number | null;

  /**
   * The number of requests left for the 1 second window.
   */
  remaining: number | null;
}
