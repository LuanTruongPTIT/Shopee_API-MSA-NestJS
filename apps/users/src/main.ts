import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EKafkaGroup } from '@libs/common/interfaces/kafka.interface';
import { Logger } from '@nestjs/common';
import kafkaInit from './kafka';
async function bootstrap() {
  console.log(process.env.KAFKA_HOST);
  console.log(EKafkaGroup.USER_GROUP);
  const logger = new Logger();
  const app: NestApplication = await NestFactory.create(AppModule);
  logger.log('vao day chua');
  await kafkaInit(app);
  logger.log('==========================================================');
  await app.listen(8001);
}
bootstrap();
