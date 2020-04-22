import { AftershipResponse } from '../model/aftership_response';
import { Notification } from '../model/notification/notification';
import { NotificationRequest } from '../model/notification/notification_request';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

/**
 * Get, add or remove contacts (sms or email) to be notified when the status of a tracking has changed.
 */
export interface NotificationEndpoint {
  /**
   * Get contact information for the users to notify when the tracking changes.
   * Please note that only customer receivers will be returned.
   * Any email, sms or webhook that belongs to the Store will not be returned.
   * @param tracking_param The param to identify the single tracking.
   * Either tracking_id or (slug + tracking_number) should be specified.
   */
  getNotification(
    tracking_param: SingleTrackingParam,
  ): Promise<AftershipResponse<Notification>>;

  /**
   * Add notification receivers to a tracking id (number).
   * @param tracking_param The param to identify the single tracking.
   * Either tracking_id or (slug + tracking_number) should be specified.
   * @param notification Notification Request Object
   */
  addNotification(
    tracking_param: SingleTrackingParam,
    notification: NotificationRequest,
  ): Promise<AftershipResponse<Notification>>;

  /**
   * Remove notification receivers from a tracking id (number).
   * @param tracking_param The param to identify the single tracking.
   * Either tracking_id or (slug + tracking_number) should be specified.
   * @param notification Notification Request Object
   */
  removeNotification(
    tracking_param: SingleTrackingParam,
    notification: NotificationRequest,
  ): Promise<AftershipResponse<Notification>>;
}
