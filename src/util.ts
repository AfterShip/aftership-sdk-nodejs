import { Method } from 'axios';
import { AftershipResource } from './resources';

export const DEFAULT_API_KEY = process.env['AFTERSHIP_API_KEY'];

export interface Meta {
  code: number;
  message?: string;
  type?: string;
}

export interface Envelope {
  meta: Meta;
  data?: any;
}

export interface Entity {
  method: Method;
  url: AftershipResource;
}
