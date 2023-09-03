import { NestApplication, NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import kafkaInit from './kafka';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app: NestApplication = await NestFactory.create(AuthModule);
  await kafkaInit(app);
  await app.listen(8005);
  logger.log('Auth service');
}
bootstrap();
