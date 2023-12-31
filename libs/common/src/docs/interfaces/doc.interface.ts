/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constants';
export interface IDocOfOptions {
  statusCode: number;
  messagePath: string;
  serialization?: ClassConstructor<any>;
  message?: string;
}
export interface IDocOptions {
  operation?: string;
  description?: string;
  summary?: string;
}
export interface IDocDefaultOptions extends IDocOfOptions {
  httpStatus: HttpStatus;
}
export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
  body?: ClassConstructor<any>;
}
export interface IDocResponseOptions<T> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  message?: string;
  serialization?: ClassConstructor<T>;
}
export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
  apiKey?: boolean;
  google?: boolean;
}
export type IDocRequestFileOptions = Omit<IDocRequestOptions, 'bodytype'>;
