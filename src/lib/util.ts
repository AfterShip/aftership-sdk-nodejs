import { AftershipError } from '../error/error';
import { ErrorEnum } from '../error/error_enum';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';

/**
 * Build tracking url by param
 * @param param tracking param
 * @param sub_path the sub path behind /:slug/:tracking_number, f.e. /:slug/:tracking_number/retrack
 */
export function buildTrackingUrl(param: SingleTrackingParam, sub_path?: string): string {
  if (param === undefined) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptyTrackingIdAndNumber,
      param,
    );
  }

  // validate
  if (!isStringValid(param.id)) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptyTrackingId,
      param.id,
    );
  }

  // Build url
  let url = `${param.id}`;

  // Add sub path
  if (isStringValid(sub_path)) {
    url += `/${sub_path}`;
  }

  // Add the additional parameters to query string
  if (param.optional_parameters !== undefined) {
    const query_string = getQueryString(param.optional_parameters);
    if (isStringValid(query_string)) {
      url = `${url}?${query_string}`;
    }
  }

  return url;
}

/**
 * Check if the string value is valid
 * @param val string value
 */
export function isStringValid(val: string | undefined): boolean {
  return (
    val !== undefined && val !== null && typeof val === 'string' && val !== ''
  );
}

/**
 * Object to query string
 * @param data Object
 */
export function getQueryString(data: any | undefined): string {
  if (data === undefined) return '';

  return Object.keys(data)
    .map((key) => {
      const val = encodeURIComponent(data[key]);
      return `${key}=${val}`;
    })
    .join('&');
}

/**
 * Combine the url and query string
 * @param url url
 * @param query query string
 */
export function combineUrlQuery(url: string, query: string): string {
  // When url or query is invalid, don't need to combine the query string
  if (!isStringValid(url) || !isStringValid(query)) {
    return url;
  }

  return `${url}${url.indexOf('?') === 0 ? '?' : '&'}${query}`;
}
