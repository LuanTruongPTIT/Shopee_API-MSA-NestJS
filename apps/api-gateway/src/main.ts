import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpApplication } from '@libs/infra/setup';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, logInfo } = setUpApplication(app);
  const config = new DocumentBuilder()
    .setTitle('API for Shopee')
    .setDescription('The Api for shopee app description')
    .setVersion('1.0')
    .addSecurity('token', { type: 'http', scheme: 'bearer' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
  logInfo();
}
bootstrap();
