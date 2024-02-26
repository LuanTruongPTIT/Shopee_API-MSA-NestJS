import { NestFactory } from '@nestjs/core';
import { FileModule } from './file.module';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  await app.listen(3000);
}
bootstrap();
