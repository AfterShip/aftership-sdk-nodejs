import lodash from 'lodash';

export class AftershipError extends Error {
  public type: string | undefined;
  public code: string;
  public data: any;
  public responseBody: string;

  constructor(type?: string, message?: string) {
    super(message);
    this.type = type;
    this.code = '';
    this.data = {};
    this.responseBody = '';
  }

  /**
   * Static Method for getting SDK error
   * @param error error
   * @param errorData The object trigger the error
   */
  public static getSdkError(error: AftershipError, errorData: any): AftershipError {
    error.data = errorData;
    Error.captureStackTrace(error);

    return error;
  }

  /**
   * Static Method for getting API error
   * @param responseBody response-body
   */
  public static getApiError(responseBody: any): AftershipError {
    const error = new AftershipError();
    error.type = lodash.get(responseBody, 'meta.type');
    error.message = lodash.get(responseBody, 'meta.message');
    error.code = lodash.get(responseBody, 'meta.code');
    error.data = lodash.get(responseBody, 'data');
    error.responseBody = JSON.stringify(responseBody);

    return error;
  }
}
