import { ApiRequest } from '../lib/api_request';
import { NotificationEndpoint } from '../endpoint/notification_endpoint';
import { Notification } from '../model/notification/notification';
import { NotificationRequest } from '../model/notification/notification_request';
import { buildTrackingUrl } from '../lib/util';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

export class NotificationImplementation implements NotificationEndpoint {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  /**
   * Get contact information for the users to notify when the tracking changes.
   * Please note that only customer receivers will be returned.
   * Any email, sms or webhook that belongs to the Store will not be returned.
   * @param tracking_param The param to identify the single tracking.
   * Either id or (slug + tracking_number) should be specified.
   */
  public getNotification(
    tracking_param: SingleTrackingParam,
  ): Promise<Notification> {
    try {
      const trackingUrl = buildTrackingUrl(tracking_param);
      return this.request.makeRequest<null, Notification>({
        method: 'GET',
        url: `/notifications/${trackingUrl}`,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Add notification receivers to a tracking id (number).
   * @param tracking_param The param to identify the single tracking.
   * Either id or (slug + tracking_number) should be specified.
   * @param notification Notification Request Object
   */
  public addNotification(
    tracking_param: SingleTrackingParam,
    notification: NotificationRequest,
  ): Promise<Notification> {
    try {
      const trackingUrl = buildTrackingUrl(tracking_param);
      return this.request.makeRequest<NotificationRequest, Notification>(
        { method: 'POST', url: `/notifications/${trackingUrl}/add` },
        notification,
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Remove notification receivers from a tracking id (number).
   * @param tracking_param The param to identify the single tracking.
   * Either id or (slug + tracking_number) should be specified.
   * @param notification Notification Request Object
   */
  public removeNotification(
    tracking_param: SingleTrackingParam,
    notification: NotificationRequest,
  ): Promise<Notification> {
    try {
      const trackingUrl = buildTrackingUrl(tracking_param);
      return this.request.makeRequest<NotificationRequest, Notification>(
        {
          method: 'POST',
          url: `/notifications/${trackingUrl}/remove`,
        },
        notification,
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
