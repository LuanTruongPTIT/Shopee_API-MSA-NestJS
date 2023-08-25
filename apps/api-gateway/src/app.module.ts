import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { ControllerModule } from './controllers/index';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '../../env',
      validate,
    }),
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
