import lodash from 'lodash';

import { ApiRequestImplementation } from './lib/api_request';
import { AftershipError } from './error/error';
import { ErrorEnum } from './error/error_enum';
import { CourierEndpoint } from './endpoint/courier_endpoint';
import { NotificationEndpoint } from './endpoint/notification_endpoint';
import { CourierImplementation } from './implementation/courier';
import { NotificationImplementation } from './implementation/notification';

const DEFAULT_API_KEY = process.env['AFTERSHIP_API_KEY'];
const DEFAULT_ENDPOINT = 'https://api.aftership.com/v4';

export class AfterShip {
  public readonly apiKey: string;
  public readonly endpoint: string;
  private rateLimiting: any = {};

  /**
   * Courier endpoint
   */
  public readonly courier: CourierEndpoint;

  /**
   * Notification endpoint
   */
  public readonly notification: NotificationEndpoint;

  constructor(apiKey: string) {
    if (apiKey !== undefined && apiKey !== '') {
      this.apiKey = apiKey;
    } else if (DEFAULT_API_KEY !== undefined) {
      this.apiKey = DEFAULT_API_KEY;
    } else {
      this.apiKey = '';
    }

    this.errorHandling(this.apiKey);
    this.endpoint = DEFAULT_ENDPOINT;

    const request = new ApiRequestImplementation(this, this.apiKey, this.endpoint);

    this.courier = new CourierImplementation(request);
    this.notification = new NotificationImplementation(request);
  }

  public getRateLimiting(): any {
    return this.rateLimiting;
  }

  public setRateLimiting(data: any): any {
    this.rateLimiting = data;
  }

  /**
   * Error Handling function
   * Throw error if the input param contain incorrect type
   *
   * @param apiKey api key
   */
  private errorHandling(apiKey: string): void {
    if (!lodash.isString(apiKey)) {
      // Verify api_key
      throw AftershipError.getSdkError(
        ErrorEnum.constructorInvalidApiKey,
        apiKey,
      );
    }
  }
}
