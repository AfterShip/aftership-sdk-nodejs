/**
 * Delivery Status
 * AfterShip automatically tag a status to each checkpoint when getting tracking information from carrier.
 * https://docs.aftership.com/api/4/delivery-status
 */
export enum DeliveryStatus {
  Pending,
  InfoReceived,
  InTransit,
  OutForDelivery,
  AttemptFail,
  Delivered,
  AvailableForPickup,
  Exception,
  Expired,
}
