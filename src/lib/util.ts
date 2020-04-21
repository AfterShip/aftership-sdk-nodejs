import { AftershipError } from '../error/error';
import { ErrorEnum } from '../error/error_enum';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

/**
 * Build tracking url by param
 * @param param tracking param
 */
export function buildTrackingUrl(param: SingleTrackingParam): string {
  if (param === undefined) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptyTrackingIdAndNumber,
      param,
    );
  }

  // tracking_id
  if (isStringValid(param.tracking_id)) {
    if (isStringValid(param.slug) || isStringValid(param.tracking_number)) {
      throw AftershipError.getSdkError(
        ErrorEnum.handlerInvalidBothTrackingIdAndNumber,
        param.tracking_id,
      );
    }

    return `${param.tracking_id}`;
  }

  // slug && tracking_number
  if (!isStringValid(param.slug) || !isStringValid(param.tracking_number)) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptyTrackingIdAndNumber,
      param.tracking_number,
    );
  }

  return `${param.slug}/${param.tracking_number}`;
}

/**
 * Check if the string value is valid
 * @param val string value
 */
export function isStringValid(val: string | undefined): boolean {
  return val !== undefined && val !== null
   && typeof val === 'string' && val !== '';
}

/**
 * Get the version of Node.js SDK
 */
export function getSdkVersion(): string {
  let version = process.env.npm_package_version;
  if (version === undefined) {
    version = '6.0.0-alpha';
  }

  return version;
}

/**
 * Object to query string
 * @param data Object
 */
export function getQueryString(data: object | undefined): string {

  if (data === undefined) return '';

  const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];
  return Object.keys(data).map(key => `${key}=${getKeyValue(key)}`).join('&');
}
