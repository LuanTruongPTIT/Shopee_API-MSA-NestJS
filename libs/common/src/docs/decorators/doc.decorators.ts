import {
  IDocDefaultOptions,
  IDocOptions,
  IDocResponseOptions,
} from '../interfaces/doc.interface';
import {
  getSchemaPath,
  ApiExtraModels,
  ApiResponse,
  ApiOperation,
  ApiHeaders,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiProduces,
} from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
// import { ResponseDefaultInterceptor } from '../../interceptors/response.default.interceptor';
import { ResponseDefaultSerialization } from '../../response/serializations/response.default.serialization';
import {
  APP_LANGUAGE,
  ENUM_DOC_REQUEST_BODY_TYPE,
} from '../constants/doc.enum.constants';
import { faker } from '@faker-js/faker';
import {
  ENUM_ERROR_STATUS_CODE_ERROR,
  ENUM_REQUEST_STATUS_CODE_ERROR,
} from '../../error/constants/error.enum.constant';
import { IDocRequestOptions } from '../interfaces/doc.interface';
export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };

  if (options.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.serialization),
      },
    };
  }
  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}
export function Doc(options?: IDocOptions): MethodDecorator {
  const currentTimestamp: number = new Date().valueOf();
  const userAgent: string = faker.internet.userAgent();
  return applyDecorators(
    ApiOperation({
      summary: options.operation,
      description: options?.description,
    }),
    ApiHeaders([
      {
        name: 'user-agent',
        description: 'User agent header',
        required: false,
        schema: {
          default: userAgent,
          example: userAgent,
          type: 'string',
        },
      },
      {
        name: 'x-custom-lang',
        description: ' Custom language header',
        required: false,
        schema: {
          default: APP_LANGUAGE,
          example: APP_LANGUAGE,
          type: 'string',
        },
      },
      {
        name: 'x-timestamp',
        description: 'Timestamp header, in miroseconds',
        required: false,
        schema: {
          default: currentTimestamp,
          example: currentTimestamp,
          type: 'number',
        },
      },
    ]),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.serverError.internalServerError',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.serverError.requestTimeout',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_REQUEST_TIMEOUT,
    }),
  );
}
export function DocRequest(options?: IDocRequestOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.JSON) {
    docs.push(ApiConsumes('application/json'));
  }

  if (options?.bodyType) {
    docs.push(
      DocDefault({
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
        statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
        messagePath: 'request.validation',
      }),
    );
  }

  if (options?.params) {
    const params: MethodDecorator[] = options?.params.map((param) =>
      ApiParam(param),
    );
    docs.push(...params);
  }
  if (options?.queries) {
    const queries: MethodDecorator[] = options?.queries?.map((query) =>
      ApiQuery(query),
    );
    docs.push(...queries);
  }

  return applyDecorators(...docs);
}

export function DocResponse<T = void>(
  messagePath: string,
  options?: IDocResponseOptions<T>,
): MethodDecorator {
  const docs: IDocDefaultOptions = {
    httpStatus: options?.httpStatus ?? HttpStatus.OK,
    message: options?.message,
    messagePath,
    statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
  };

  if (options?.serialization) {
    docs.serialization = options?.serialization;
  }

  return applyDecorators(ApiProduces('application/json'), DocDefault(docs));
}
