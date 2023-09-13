import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import {
  // AllExceptionFilter,
  RpcExceptionFilter,
  // ExceptionFilter,
} from '../exception/all-exceptions.filter';
export const setUpApplication = (app: INestApplication) => {
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
    }),
  );
  app.useGlobalFilters(new RpcExceptionFilter());
  const configService = app.get(ConfigService);
  const port = _.parseInt(configService.get('PORT'), 10);
  return {
    port,
    logInfo: () => {
      console.table({
        port,
        service: configService.get('SERVICE_NAME'),
      });
    },
  };
};
