/**
 * Delivery Status
 * AfterShip automatically tag a status to each checkpoint when getting tracking information from carrier.
 * https://docs.aftership.com/api/4/delivery-status
 */
export enum DeliveryStatus {
  Pending = 'Pending',
  InfoReceived = 'InfoReceived',
  InTransit = 'InTransit',
  OutForDelivery = 'OutForDelivery',
  AttemptFail = 'AttemptFail',
  Delivered = 'Delivered',
  AvailableForPickup = 'AvailableForPickup',
  Exception = 'Exception',
  Expired = 'Expired',
}
