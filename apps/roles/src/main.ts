import { NestApplication, NestFactory } from '@nestjs/core';
import { RoleModule } from './role.module';
import kafkaInit from './kafka';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(RoleModule);
  await kafkaInit(app);
  await app.listen(process.env.PORT);
}
bootstrap();
