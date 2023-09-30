import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kafkaInit from './kafka';
import { NestApplication } from '@nestjs/core';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  console.log(process.env.KAFKA_HOST);
  await kafkaInit(app);

  await app.listen(process.env.PORT);
}
bootstrap();
