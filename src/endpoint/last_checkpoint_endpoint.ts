import { AftershipResponse } from '../model/aftership_response';
import { LastCheckpoint } from '../model/last_checkpoint/last_checkpoint';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

/**
 * Get tracking information of the last checkpoint of a tracking.
 */
export interface LastCheckpointEndpoint {
  /**
   * Return the tracking information of the last checkpoint of a single tracking.
   * @param tracking_param The param to identify the single tracking.
   * Either tracking_id or (slug + tracking_number) should be specified.
   * @param fields Optional, List of fields to include in the response. Use comma for multiple values.
   * Fields to include:
   * slug, created_at, checkpoint_time, city, coordinates, country_iso3, country_name, message, state, tag, zip
   * Default: none, Example: city,tag
   * @param lang Optional, Support Chinese to English translation for china-ems and china-post only. (Example: en)
   */
  getLastCheckpoint(
    tracking_param: SingleTrackingParam,
    fields?: string,
    lang?: string,
  ): Promise<AftershipResponse<LastCheckpoint>>;
}
