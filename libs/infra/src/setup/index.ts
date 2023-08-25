import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
export const setUpApplication = (app: INestApplication) => {
  app.setGlobalPrefix('api');
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
