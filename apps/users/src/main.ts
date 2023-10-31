import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kafkaInit from './kafka';
import { getMetadataArgsStorage } from 'typeorm';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  console.log(getMetadataArgsStorage().tables.map((tbl) => tbl.target));
  console.log(process.env.DATABASE_NAME, process.env.PORT);
  await kafkaInit(app);
  await app.listen(8003);
}
bootstrap();
