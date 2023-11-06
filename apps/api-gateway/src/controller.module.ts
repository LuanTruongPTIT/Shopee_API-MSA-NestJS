import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from '@libs/common/redis/redis.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app/controller/app.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    RedisModule.forRoot(),
    AuthModule,
    UserModule,
    RoleModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ControllerModule {}
