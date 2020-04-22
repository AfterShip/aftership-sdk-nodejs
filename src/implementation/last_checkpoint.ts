import { ApiRequest } from '../lib/api_request';
import { AftershipResponse } from '../model/aftership_response';
import { LastCheckpointEndpoint } from '../endpoint/last_checkpoint_endpoint';
import { SingleTrackingParam } from '../model/tracking/single_tracking_param';
import { LastCheckpoint } from '../model/last_checkpoint/last_checkpoint';
import { buildTrackingUrl, isStringValid } from '../lib/util';

export class LastCheckpointImplementation implements LastCheckpointEndpoint {
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
  public getLastCheckpoint(
    tracking_param: SingleTrackingParam,
    fields?: string,
    lang?: string,
  ): Promise<AftershipResponse<LastCheckpoint>> {
    try {
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
      return this.request.makeRequest<null, LastCheckpoint>({
        method: 'GET',
        url: `/last_checkpoint/${trackingUrl}`,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
