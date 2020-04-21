import { ApiRequestImplementation } from './lib/api_request';
import { AftershipError } from './error/error';
import { ErrorEnum } from './error/error_enum';
import { AftershipOption } from './model/aftership_option';
import { RateLimit } from './model/rate_limit';
import { isStringValid } from './lib/util';
import { CourierEndpoint } from './endpoint/courier_endpoint';
import { LastCheckPointEndpoint } from './endpoint/last_checkpoint_endpoint';
import { NotificationEndpoint } from './endpoint/notification_endpoint';
import { CourierImplementation } from './implementation/courier';
import { LastCheckPointImplementation } from './implementation/last_checkpoint';
import { NotificationImplementation } from './implementation/notification';

const DEFAULT_API_KEY = process.env['AFTERSHIP_API_KEY'];
const DEFAULT_ENDPOINT = 'https://api.aftership.com/v4';
const DEFAULT_USER_AGENT = 'aftership-sdk-nodejs';

export class AfterShip {
  public readonly apiKey: string;
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
   * Last CheckPoint endpoint
   */
  public readonly last_checkpoint: LastCheckPointEndpoint;

  /**
   * Notification endpoint
   */
  public readonly notification: NotificationEndpoint;

  constructor(apiKey: string, options?: AftershipOption) {
    this.apiKey = this.getApiKey(apiKey);
    this.errorHandling(this.apiKey, options);

    // Setup
    if (options !== null && options !== undefined) {
      this.endpoint = isStringValid(options.endpoint)
        ? options.endpoint
        : DEFAULT_ENDPOINT;
      this.user_agent_prefix = isStringValid(options.user_agent_prefix)
        ? options.user_agent_prefix
        : DEFAULT_USER_AGENT;
    } else {
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
    this.last_checkpoint = new LastCheckPointImplementation(request);
    this.notification = new NotificationImplementation(request);
  }

  private getApiKey(apiKey: string): string {
    if (apiKey !== undefined && apiKey !== '') {
      return apiKey;
    }

    if (DEFAULT_API_KEY !== undefined) {
      return DEFAULT_API_KEY;
    }

    return '';
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
