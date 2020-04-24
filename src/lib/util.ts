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

  // validate
  if (
    isStringValid(param.id) &&
    (isStringValid(param.slug) || isStringValid(param.tracking_number))
  ) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidBothTrackingIdAndNumber,
      param.id,
    );
  } else if (
    !isStringValid(param.id) &&
    !isStringValid(param.slug) &&
    !isStringValid(param.tracking_number)
  ) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptyTrackingIdAndNumber,
      param.tracking_number,
    );
  } else if (
    !isStringValid(param.id) &&
    (!isStringValid(param.slug) || !isStringValid(param.tracking_number))
  ) {
    throw AftershipError.getSdkError(
      ErrorEnum.handlerInvalidEmptySlugOrTrackNumber,
      param.tracking_number,
    );
  }

  // Build url
  let url = '';

  // id
  if (isStringValid(param.id)) {
    url = `${param.id}`;
  } else {
    // slug && tracking_number

    url = `${param.slug}/${param.tracking_number}`;
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
