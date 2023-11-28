import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kafkaInit from './kafka';
import { getMetadataArgsStorage } from 'typeorm';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  await kafkaInit(app);
  await app.listen(8003);
}
bootstrap();
