import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import kafkaInit from './kafka';

async function bootstrap() {
  const logger = new Logger();
  const app: NestApplication = await NestFactory.create(AppModule);
  console.log(process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN);
  await kafkaInit(app);
  logger.log('==========================================================');
  console.log(process.env.PORT);
  await app.listen(8003);
}
bootstrap();
