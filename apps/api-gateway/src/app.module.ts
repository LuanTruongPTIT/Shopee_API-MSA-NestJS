import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config';
import { ControllerModule } from './index';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '../../env',
      validate,
    }),
    ControllerModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
