import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/index';
import { AuthService } from './auth.service';
import { AwsModule } from './aws/aws.module';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    JwtModule.register(config.JWT),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AwsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
