import { ICourier, Courier } from './courier';
import { DEFAULT_API_KEY } from './util';
import { ApiRequest } from './api_request';

class AfterShip {
  private apiKey: string;
  private rateLimiting: any = {};

  public courier: ICourier;
  constructor(apiKey: string) {
    if (apiKey !== undefined && apiKey !== '') {
      this.apiKey = apiKey;
    } else if (DEFAULT_API_KEY !== undefined) {
      this.apiKey = DEFAULT_API_KEY;
    } else {
      this.apiKey = 'aftership-api-key';
    }

    const request = new ApiRequest(this, this.apiKey);

    this.courier = new Courier(request);
  }

  public getRateLimiting(): any {
    return this.rateLimiting;
  }

  public setRateLimiting(data: any): any {
    this.rateLimiting = data;
  }
}

const _afterShip = () => {
  let app: AfterShip | undefined = undefined;
  return (apiKey: string) => {
    if (app === undefined) {
      app = new AfterShip(apiKey);
    }
    return app;
  };
};

const afterShip = _afterShip();

export { afterShip as AfterShip };
