import { ApiRequest } from '../lib/api_request';
import { TrackingEndpoint } from '../endpoint/tracking_endpoint';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';
import { Tracking } from '../model/tracking/tracking';
import { TrackingList } from '../model/tracking/tracking_list';
import { TrackingCreateParams } from '../model/tracking/tracking_create_params';
import { MultiTrackingsQueryParams } from '../model/tracking/multi_trackings_query_params';
import { TrackingQueryParams } from '../model/tracking/tracking_query_params';
import { TrackingUpdateParams } from '../model/tracking/tracking_update_params';
import { MarkAsCompletedParam } from '../model/tracking/mark_as_complated_param';
import { buildTrackingUrl, getQueryString, combineUrlQuery } from '../lib/util';
import { AftershipError } from '../error/error';
import { ErrorEnum } from '../error/error_enum';

export class TrackingImplementation implements TrackingEndpoint {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  /**
   * Create a tracking.
   * @param data Tracking post Request Object
   */
  public createTracking(
    data: TrackingCreateParams,
  ): Promise<Tracking> {

    // make request
    return this.request.makeRequest<TrackingCreateParams, Tracking>(
      { method: 'POST', url: '/trackings' },
      data,
    );
  }

  /**
   * Delete a tracking.
   * @param single_tracking_param The param to identify the single tracking.
   */
  public deleteTracking(
    single_tracking_param: SingleTrackingParam,
  ): Promise<Tracking> {
    const trackingUrl = buildTrackingUrl(single_tracking_param);
    // make request
    return this.request.makeRequest<null, Tracking>(
      { method: 'DELETE', url: `/trackings/${trackingUrl}` },
    );
  }

  /**
   * Get tracking results of multiple trackings.
   * trackings_query_params to include: page,limit,keyword,slug,delivery_time,origin
   * ,destination,tag,created_at_min,created_at_max,fields,lang
   * @param trackings_query_params Tracking list query params object
   */
  public listTrackings(
    trackings_query_params?: MultiTrackingsQueryParams,
  ): Promise<TrackingList> {

    const queryString = getQueryString(trackings_query_params);
    const trackingUrl = queryString === '' ? '/trackings' : `/trackings?${queryString}`;

    // make request
    return this.request.makeRequest<null, TrackingList>(
      { method: 'GET', url: trackingUrl },
    );
  }

  /**
   * Get tracking results of a single tracking.
   * tracking_query_params to include: fields, lang
   * @param single_tracking_param The param to identify the single tracking.
   * @param tracking_query_params Tracking query params object
   */
  public getTracking(
    single_tracking_param: SingleTrackingParam,
    tracking_query_params?: TrackingQueryParams,
  ): Promise<Tracking> {

    let trackingUrl = `/trackings/${buildTrackingUrl(single_tracking_param)}`;

    const queryString = getQueryString(tracking_query_params);
    trackingUrl = combineUrlQuery(trackingUrl, queryString);

    // make request
    return this.request.makeRequest<null, Tracking>(
      { method: 'GET', url: trackingUrl },
    );
  }

  /**
   * Update a tracking.
   * tracking_update_params to include: smses, emails,title,customer_name,order_id,
   * order_id_path,custom_fields,note,language,order_promised_delivery_date,delivery_type,pickup_location,pickup_note
   * @param single_tracking_param The param to identify the single tracking.
   * @param tracking_update_params Tracking update params object
   */
  public updateTracking(
    single_tracking_param: SingleTrackingParam,
    data?: TrackingUpdateParams,
  ): Promise<Tracking> {
    const trackingUrl = `/trackings/${buildTrackingUrl(single_tracking_param)}`;

    // make request
    return this.request.makeRequest<TrackingUpdateParams, Tracking>(
      { method: 'PUT', url: trackingUrl },
      data,
    );
  }

  /**
   * Retrack an expired tracking. Max 3 times per tracking.
   * @param single_tracking_param The param to identify the single tracking.
   */
  public retrack(
    single_tracking_param: SingleTrackingParam,
  ): Promise<Tracking> {
    const trackingUrl = `/trackings/${buildTrackingUrl(single_tracking_param, 'retrack')}`;

    // make request
    return this.request.makeRequest<null, Tracking>(
      { method: 'POST', url: trackingUrl },
    );
  }

  /**
   * Mark a tracking as completed. The tracking won't auto update until retrack it.
   * @param single_tracking_param The param to identify the single tracking.
   * @param reason_param The param to mark tracking as complete.
   */
  public markAsCompleted(
    single_tracking_param: SingleTrackingParam,
    reason_param: MarkAsCompletedParam,
  ): Promise<Tracking> {
    const trackingUrl = `/trackings/${buildTrackingUrl(single_tracking_param, 'mark-as-completed')}`;

    if (reason_param === undefined || (reason_param.reason !== 'DELIVERED'
     && reason_param.reason !== 'LOST' && reason_param.reason !== 'RETURNED_TO_SENDER')) {
      throw AftershipError.getSdkError(
        ErrorEnum.handlerInvalidMarkAsCompletedReason,
        reason_param,
      );
    }

    // make request
    return this.request.makeRequest<MarkAsCompletedParam, Tracking>(
      { method: 'POST', url: trackingUrl },
      reason_param,
    );
  }
}
