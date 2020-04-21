import { AftershipResponse } from '../model/aftership_response';
import { Tracking } from '../model/tracking/tracking';
import { TrackingList } from '../model/tracking/tracking_list';
import { TrackingPostParams } from '../model/tracking/tracking_post_params';
import { TrackingsQueryParams } from '../model/tracking/trackings_query_params';
import { TrackingQueryParams } from '../model/tracking/tracking_query_params';
import { TrackingUpdatParams } from '../model/tracking/tracking_update_params';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

/**
 * Create trackings, update trackings, and get tracking results.
 */
export interface TrackingEndpoint {
  /**
   * Create a tracking.
   * @param tracking_post_params Tracking post Request Object
   */
  createTracking(
    tracking_post_params: TrackingPostParams,
  ): Promise<AftershipResponse<Tracking>>;

  /**
   * Delete a tracking.
   * @param single_tracking_param The param to identify the single tracking.
   */
  deleteTracking(
    single_tracking_param: SingleTrackingParam,
  ): Promise<AftershipResponse<Tracking>>;

  /**
   * Get tracking results of multiple trackings.
   * trackings_query_params to include: page,limit,keyword,slug,delivery_time,origin
   * ,destination,tag,created_at_min,created_at_max,fields,lang
   * @param trackings_query_params Tracking list query params object
   */
  listTrackings(
    trackings_query_params?: TrackingsQueryParams,
  ): Promise<AftershipResponse<TrackingList>>;

  /**
   * Get tracking results of a single tracking.
   * tracking_query_params to include: fields, lang
   * @param single_tracking_param The param to identify the single tracking.
   * @param tracking_query_params Tracking query params object
   */
  getTracking(
    single_tracking_param: SingleTrackingParam,
    tracking_query_params?: TrackingQueryParams,
  ): Promise<AftershipResponse<Tracking>>;

  /**
   * Update a tracking.
   * tracking_update_params to include: smses, emails,title,customer_name,order_id,
   * order_id_path,custom_fields,note,language,order_promised_delivery_date,delivery_type,pickup_location,pickup_note
   * @param single_tracking_param The param to identify the single tracking.
   * @param tracking_update_params Tracking update params object
   */
  updateTracking(
    single_tracking_param: SingleTrackingParam,
    tracking_update_params?: TrackingUpdatParams,
  ): Promise<AftershipResponse<Tracking>>;

  /**
   * Retrack an expired tracking. Max 3 times per tracking.
   * @param single_tracking_param The param to identify the single tracking.
   */
  retrack(
    single_tracking_param: SingleTrackingParam,
  ): Promise<AftershipResponse<Tracking>>;
}
