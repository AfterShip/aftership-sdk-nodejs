import { AftershipError } from './error';

export enum ErrorType {
  ConstructorError = 'ConstructorError',
  HandlerError = 'HandlerError',
  InternalError = 'InternalError',
}

export class ErrorEnum {
  public static constructorInvalidApiKey = new AftershipError(
    ErrorType.ConstructorError,
    'ConstructorError: Invalid API key',
  );

  public static constructorInvalidOptions = new AftershipError(
    ErrorType.ConstructorError,
    'ConstructorError: Invalid Options value',
  );

  public static constructorInvalidEndpoint = new AftershipError(
    ErrorType.ConstructorError,
    'ConstructorError: Invalid Endpoint value',
  );

  public static constructorInvalidProxy = new AftershipError(
    ErrorType.ConstructorError,
    'ConstructorError: Invalid Proxy value',
  );

  public static constructorInvalidTrackingNumber = new AftershipError(
    ErrorType.ConstructorError,
    'ConstructorError: tracking_number',
  );

  public static handlerInvalidBody = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Invalid Body value',
  );

  public static handlerInvalidQuery = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Invalid Query value',
  );

  public static handlerInvalidRaw = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Invalid Raw value',
  );

  public static handlerInvalidApiKey = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Invalid API key',
  );

  public static handlerInvalidTimeout = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Invalid Timeout',
  );

  public static handlerInvalidBothTrackingIdAndNumber = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Cannot specify id and tracking number at the same time',
  );

  public static handlerInvalidEmptyTrackingIdAndNumber = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: You must specify the id or slug and tracking number',
  );

  public static handlerInvalidEmptySlugOrTrackNumber = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: You must specify both slug and tracking number',
  );

  public static handlerInvalidMarkAsCompletedReason = new AftershipError(
    ErrorType.HandlerError,
    'HandlerError: Reason must be one of "DELIVERED", "LOST" or "RETURNED_TO_SENDER"',
  );

  // API InternalError
  public static internalError = new AftershipError(
    ErrorType.InternalError,
    "Something went wrong on AfterShip's end.",
  );
}
