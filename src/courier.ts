import { makeRequest, AftershipUrl } from './util';

export class Courier {
  private app: any;
  private apiKey: string;

  constructor(app: any, apiKey: string) {
    this.app = app;
    this.apiKey = apiKey;
  }

  public listCouriers(callback?: Function): any {
    const apiKey = this.apiKey;
    return makeRequest(this.app)({ method: 'GET', url: AftershipUrl.Couriers })({ apiKey })({})(callback);
  }
  public listAllCouriers(callback?: Function): any {
    const apiKey = this.apiKey;
    return makeRequest(this.app)({ method: 'GET', url: AftershipUrl.CouriersAll })({ apiKey })({})(callback);
  }
  public detectCouriers(data: any, callback?: Function): any {
    const apiKey = this.apiKey;
    return makeRequest(this.app)({ method: 'POST', url: AftershipUrl.Detect })({ apiKey })(data)(callback);
  }
}
