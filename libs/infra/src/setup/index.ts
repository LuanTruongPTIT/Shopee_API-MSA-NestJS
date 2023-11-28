import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import cookieParser from 'cookie-parser';
import {
  // AllExceptionFilter,
  RpcExceptionFilter,
  // ExceptionFilter,
} from '../exception/all-exceptions.filter';
import session from 'express-session';
import passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
export const setUpApplication = (app: NestExpressApplication) => {
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Accept',
      'Accept-Language',
      'Content-Language',
      'Content-Type',
      'Origin',
      'Authorization',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'Access-Control-Expose-Headers',
      'Access-Control-Max-Age',
      'Referer',
      'Host',
      'X-Requested-With',
      'x-custom-lang',
      'x-timestamp',
      'x-api-key',
      'x-timezone',
      'x-request-id',
      'x-version',
      'x-repo-version',
      'X-Response-Time',
      'user-agent',
    ],
    credentials: true,
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
  app.use(cookieParser());
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
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
