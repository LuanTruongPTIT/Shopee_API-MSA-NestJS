import { NestApplication, NestFactory } from '@nestjs/core';
import { LogisticsModule } from './logistics.module';
import kafkaInit from './kafka';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(LogisticsModule);
  await kafkaInit(app);
  await app.listen(process.env.PORT);
}
bootstrap();
