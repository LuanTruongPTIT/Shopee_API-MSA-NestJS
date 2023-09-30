import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplication } from '@nestjs/core';
import kafkaInit from './kafka';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  await kafkaInit(app);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
