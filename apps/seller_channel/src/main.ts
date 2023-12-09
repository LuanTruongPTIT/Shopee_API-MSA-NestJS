import { NestApplication, NestFactory } from '@nestjs/core';
import { SellerChannelModule } from './seller_channel.module';
import kafkaInit from './kafka';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(SellerChannelModule);
  await kafkaInit(app);
  await app.listen(process.env.PORT);
}
bootstrap();
