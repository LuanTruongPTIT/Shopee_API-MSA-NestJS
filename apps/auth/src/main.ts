import { NestApplication, NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import kafkaInit from './kafka';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger();
  const app: NestApplication = await NestFactory.create(AuthModule);
  await kafkaInit(app);
  console.log(process.env.PORT);
  await app.listen(8005);
  logger.log('Auth service');
}
bootstrap();
