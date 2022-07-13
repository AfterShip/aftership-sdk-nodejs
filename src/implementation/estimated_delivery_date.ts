import { ApiRequest } from '../lib/api_request';
import { EstimatedDeliveryDateEndpoint } from '../endpoint/estimated_delivery_date_endpoint';
import {
  EstimatedDeliveryDate,
  EstimatedDeliveryDateBatchPredictParams,
} from '../model/estimated_delivery_date/estimated_delivery_date_batch_predict_params';

export class EstimatedDeliveryDateImplementation implements EstimatedDeliveryDateEndpoint {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  /**
   * Batch predict the estimated delivery dates
   */
  public batchPredict(
    data: EstimatedDeliveryDateBatchPredictParams,
  ): Promise<EstimatedDeliveryDate[]> {

    // make request
    return this.request.makeRequest<EstimatedDeliveryDateBatchPredictParams, EstimatedDeliveryDate[]>(
      {
        method: 'POST',
        url: '/estimated-delivery-date/predict-batch',
      },
      data,
    );
  }
}
