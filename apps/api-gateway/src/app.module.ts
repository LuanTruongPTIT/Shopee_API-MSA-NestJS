import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config';
import { ControllerModule } from './index';
import { CommonModule } from '../../../libs/common/src/common.module';
import config from '@libs/common/configs/auth.config';
import { AuthModule } from './guards/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),
    ControllerModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
