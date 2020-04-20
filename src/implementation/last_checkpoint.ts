import { ApiRequest } from '../lib/api_request';
import { AftershipResponse } from '../model/aftership_response';
import { LastCheckPointEndpoint } from '../endpoint/last_checkpoint_endpoints';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';
import { LastCheckPoint } from '../model/checkpoint/last_checkpoint';
import { buildTrackingUrl, isStringValid } from '../lib/util';

export class LastCheckPointImplementation implements LastCheckPointEndpoint {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  /**
   * Return the tracking information of the last checkpoint of a single tracking.
   * @param tracking_param The param to identify the single tracking.
   * Either tracking_id or (slug + tracking_number) should be specified.
   * @param fields Optional, List of fields to include in the response. Use comma for multiple values.
   * Fields to include:
   * slug, created_at, checkpoint_time, city, coordinates, country_iso3, country_name, message, state, tag, zip
   * Default: none, Example: city,tag
   * @param lang Optional, Support Chinese to English translation for china-ems and china-post only. (Example: en)
   */
  public getLastCheckPoint(
    tracking_param: SingleTrackingParam,
    fields?: string,
    lang?: string,
  ): Promise<AftershipResponse<LastCheckPoint>> {
    let trackingUrl = buildTrackingUrl(tracking_param);
    // Add optional params to tracking url
    const optionalParams = [];
    if (isStringValid(fields)) {
      optionalParams.push(`fields=${fields}`);
    }

    if (isStringValid(lang)) {
      optionalParams.push(`lang=${lang}`);
    }

    if (optionalParams.length > 0) {
      trackingUrl += `?${optionalParams.join('&')}`;
    }

    // make request
    return this.request.makeRequest<null, LastCheckPoint>({
      method: 'GET',
      url: `/last_checkpoint/${trackingUrl}`,
    });
  }
}
