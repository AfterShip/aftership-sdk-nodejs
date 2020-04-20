/**
 * Notification Object
 */
export interface Notification {
  /**
   * Hash describes the notification information.
   */
  notification: {
    /**
     * Email address(es) to receive email notifications.
     */
    emails: string[];

    /**
     * Phone number(s) to receive sms notifications.
     */
    smses: string[];
  };
}
