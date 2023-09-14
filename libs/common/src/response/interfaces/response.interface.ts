import { HttpStatus } from '@nestjs/common';
import { IMessageOptionsProperties } from '../../message/interface/message.interface';
export interface IResponseCustomPropertyMetadata {
  statusCode?: number;
  message?: string;
  httpStatus?: HttpStatus;
  messageProperties?: IMessageOptionsProperties;
}
export interface IResponseMetadata {
  customProperty?: IResponseCustomPropertyMetadata;
  [key: string]: any;
}
export interface IResponse {
  _metadata?: IResponseMetadata;
  data?: Record<string, any>;
}
