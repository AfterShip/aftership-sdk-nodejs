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

  // API InternalError
  public static internalError = new AftershipError(
    ErrorType.InternalError,
    "Something went wrong on AfterShip's end.",
  );
}
