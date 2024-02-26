import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpApplication } from '@libs/infra/setup';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(
  //   path.join(__dirname, '../../../../../../apps/api-gateway/uploads'),
  // );

  const { port, logInfo } = setUpApplication(app);
  const config = new DocumentBuilder()
    .setTitle('API for Shopee')
    .setDescription('The Api for shopee app description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refreshToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'google',
    )
    .addCookieAuth('csrf-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
  logInfo();
}
bootstrap();
