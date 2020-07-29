/**
 * The param to mark tracking as complete
 */
export interface MarkAsCompletedParam {
  /**
   * One of "DELIVERED", "LOST" or "RETURNED_TO_SENDER".
   */
  reason: MarkAsCompletedReason;
}

/**
 * One of "DELIVERED", "LOST" or "RETURNED_TO_SENDER".
 */
export enum MarkAsCompletedReason {
  /**
   * Mark the tracking as completed with "DELIVERED". The tag of the tracking will be updated to Delivered
   * and the subtag will be updated to Delivered_001.
   */
  Delivered = 'DELIVERED',

  /**
   * Mark the tracking as completed with "LOST". The tag of the tracking will be updated to Exception
   * and the subtag will be updated to Exception_013.
   */
  Lost = 'LOST',

  /**
   * Mark the tracking as completed with "RETURNED_TO_SENDER". The tag of the tracking will be updated to Exception
   * and the subtag will be updated to Exception_011.
   */
  ReturnToSender = 'RETURNED_TO_SENDER',
}
