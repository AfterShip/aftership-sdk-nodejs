import { ApiRequestImplementation } from './lib/api_request';
import { AftershipError } from './error/error';
import { ErrorEnum } from './error/error_enum';
import { AftershipOption } from './model/aftership_option';
import { RateLimit } from './model/rate_limit';
import { isStringValid } from './lib/util';
import { CourierEndpoint } from './endpoint/courier_endpoint';
import { LastCheckpointEndpoint } from './endpoint/last_checkpoint_endpoint';
import { NotificationEndpoint } from './endpoint/notification_endpoint';
import { TrackingEndpoint } from './endpoint/tracking_endpoint';
import { EstimatedDeliveryDateEndpoint } from './endpoint/estimated_delivery_date_endpoint';
import { CourierImplementation } from './implementation/courier';
import { LastCheckpointImplementation } from './implementation/last_checkpoint';
import { NotificationImplementation } from './implementation/notification';
import { TrackingImplementation } from './implementation/tracking';
import { EstimatedDeliveryDateImplementation } from './implementation/estimated_delivery_date';

const DEFAULT_ENDPOINT = 'https://api.aftership.com/tracking/2023-10';
const DEFAULT_USER_AGENT = 'aftership-sdk-nodejs';

export class AfterShip {
  public readonly authType: number;
  public readonly apiKey: string;
  public readonly apiSecret: string;
  public readonly endpoint: string;
  public readonly user_agent_prefix: string;

  /**
   * The recent rate limit after making an API call
   */
  public rate_limit: RateLimit;

  /**
   * Courier endpoint
   */
  public readonly courier: CourierEndpoint;

  /**
   * Last Checkpoint endpoint
   */
  public readonly last_checkpoint: LastCheckpointEndpoint;

  /**
   * Notification endpoint
   */
  public readonly notification: NotificationEndpoint;

  /**
   * Tracking endpoint
   */
  public readonly tracking: TrackingEndpoint;

  /**
   * EstimatedDeliveryDate endpoint
   */
  public readonly estimated_delivery_date: EstimatedDeliveryDateEndpoint;

  constructor(apiKey: string, options?: AftershipOption) {
    this.errorHandling(apiKey, options);
    this.apiKey = apiKey;

    // Setup
    if (options !== null && options !== undefined) {
      this.endpoint = isStringValid(options.endpoint)
        ? options.endpoint
        : DEFAULT_ENDPOINT;
      this.user_agent_prefix = isStringValid(options.user_agent_prefix)
        ? options.user_agent_prefix
        : DEFAULT_USER_AGENT;
      this.authType = options.auth_type !== undefined
        ? options.auth_type
        : 0;
      this.apiSecret = isStringValid(options.api_secret)
        ? options.api_secret
        : '';
    } else {
      this.authType = 1;
      this.apiSecret = '';
      this.endpoint = DEFAULT_ENDPOINT;
      this.user_agent_prefix = DEFAULT_USER_AGENT;
    }

    this.rate_limit = {
      reset: null,
      limit: null,
      remaining: null,
    };

    const request = new ApiRequestImplementation(this);

    // Endpoints
    this.courier = new CourierImplementation(request);
    this.last_checkpoint = new LastCheckpointImplementation(request);
    this.notification = new NotificationImplementation(request);
    this.tracking = new TrackingImplementation(request);
    this.estimated_delivery_date = new EstimatedDeliveryDateImplementation(request);
  }

  /**
   * Error Handling function
   * Throw error if the input param contain incorrect type
   * @param apiKey api key
   */
  private errorHandling(apiKey: string, options?: AftershipOption): void {
    if (!isStringValid(apiKey)) {
      // Verify api_key
      throw AftershipError.getSdkError(
        ErrorEnum.constructorInvalidApiKey,
        apiKey,
      );
    }

    if (options !== null && options !== undefined) {
      // Verify options
      if (typeof options !== 'object') {
        throw AftershipError.getSdkError(
          ErrorEnum.constructorInvalidOptions,
          options,
        );
      }

      // Verify options value
      if (
        options.endpoint !== null &&
        options.endpoint !== undefined &&
        typeof options.endpoint !== 'string'
      ) {
        // Verify endpoint
        throw AftershipError.getSdkError(
          ErrorEnum.constructorInvalidEndpoint,
          options.endpoint,
        );
      }
    }
  }
}
