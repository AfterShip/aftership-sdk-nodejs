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
  public static getSdkError(
    error: AftershipError,
    errorData: any,
  ): AftershipError {
    error.data = errorData;
    Error.captureStackTrace(error);

    return error;
  }

  /**
   * Static Method for getting REQUEST error
   * @param error error
   * @param error_data The object trigger the error
   */
  public static getRequestError(error: any, error_data: any): AftershipError {
    error.data = error_data;
    error.type = error.code;

    return error;
  }

  /**
   * Static Method for getting API error
   * @param responseBody response-body
   */
  public static getApiError(responseBody: any): AftershipError {
    const error = new AftershipError();
    if (responseBody === null || responseBody === undefined) {
      // Can't get the response body, set 500 error by default
      error.type = 'InternalError';
      error.code = '500';
      return error;
    }

    if (responseBody.meta !== null && responseBody.meta !== undefined) {
      error.type = responseBody.meta.type;
      error.message = responseBody.meta.message;
      error.code = responseBody.meta.code;
    }

    error.data = responseBody.data;
    error.responseBody = JSON.stringify(responseBody);

    return error;
  }
}
