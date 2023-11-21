import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config';
import { ControllerModule } from './controller.module';
import { CommonModule } from '../../../libs/common/src/common.module';
import config from '@libs/common/configs/auth.config';
import appConfig from '@libs/common/configs/app.config';
import { AuthModule } from './auth/auth.module';
import googleConfig from '@libs/common/configs/google.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, appConfig, googleConfig],
      validate,
    }),
    ControllerModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
