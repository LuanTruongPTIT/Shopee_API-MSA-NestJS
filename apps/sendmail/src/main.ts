import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kafkaInit from './kafka';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  await kafkaInit(app);
  await app.listen(process.env.PORT);
}
bootstrap();
