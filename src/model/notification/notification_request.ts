/**
 * Notification Request Object
 */
export interface NotificationRequest {
  /**
   * Hash describes the notification information.
   */
  notification: {
    /**
     * Email address(es) to receive email notifications.
     * Accept either array or comma separated as input.
     */
    emails: string[] | string;

    /**
     * Phone number(s) to receive sms notifications. Enter+andarea codebefore phone number.
     * Accept either array or comma separated as input.
     */
    smses: string[] | string;
  };
}
