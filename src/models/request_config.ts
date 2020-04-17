import { Method } from 'axios';
import { AftershipResource } from '../resources';

export interface RequestConfig {
  method: Method;
  url: AftershipResource;
}
