import { Checkpoint } from '../checkpoint/checkpoint';
import { DeliveryStatus } from '../tracking/delivery_status';

/**
 * Last Checkpoint Object
 */
export interface LastCheckpoint {
  /**
   * Tracking number.
   */
  tracking_number: string;

  /**
   * Unique code of courier.
   */
  slug: string;
  /**
   * Current status of tracking. Values include:
   * Pending, InfoReceived, InTransit, OutForDelivery, AttemptFail, Delivered, AvailableForPickup, Exception, Expired
   * See tag definition: https://docs.aftership.com/api/4/delivery-status
   */
  tag: DeliveryStatus;

  /**
   * Current subtag of tracking.
   * See subtag definition: https://help.aftership.com/hc/en-us/articles/360007823253
   */
  subtag: string;

  /**
   * Normalized tracking message.
   * See subtag message definition: https://help.aftership.com/hc/en-us/articles/360007823253
   */
  subtag_message: string;

  /**
   * Hash describes the checkpoint information.
   */
  checkpoint: Checkpoint;
}
