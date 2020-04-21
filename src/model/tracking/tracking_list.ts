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
   * Array of Hash describes the tracking information.
   */
  trackings?: [Tracking];
}
