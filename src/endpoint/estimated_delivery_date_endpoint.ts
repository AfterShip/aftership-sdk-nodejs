import {
  EstimatedDeliveryDate,
  EstimatedDeliveryDateBatchPredictParams,
} from '../model/estimated_delivery_date/estimated_delivery_date_batch_predict_params';

export interface EstimatedDeliveryDateEndpoint {
  /**
   * Batch predict the estimated delivery dates
   */
  batchPredict(
    data: EstimatedDeliveryDateBatchPredictParams,
  ): Promise<EstimatedDeliveryDate[]>;
}
