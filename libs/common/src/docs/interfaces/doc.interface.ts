/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constants';
export interface IDocOfOptions {
  statusCode: number;
  messagePath: string;
  serialization?: ClassConstructor<any>;
}
export interface IDocOptions {
  operation?: string;
  description?: string;
}
export interface IDocDefaultOptions extends IDocOfOptions {
  httpStatus: HttpStatus;
}
export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType: ENUM_DOC_REQUEST_BODY_TYPE;
}
export interface IDocResponseOptions<T> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  serialization?: ClassConstructor<T>;
}
