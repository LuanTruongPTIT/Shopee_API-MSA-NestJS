import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './common/config/kafka';
import { UserController } from './user/controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtAccessStrategy } from './guards/jwt-access/auth.jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenPayloadCheckExist } from './guards/authentication.guard';
import { RedisModule } from 'libs/redis/src/redis.module';
import { checkNumberLoginFail } from './guards/checkNumberLoginFail.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { CategoryController } from './category/controller/category.controller';
import { ResponseDefaultInterceptor } from './common/response/interceptors/response.default.interceptor';
import { RoleController } from './role/controller/role.controller';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClientsModule.register(clientModuleOptions),
    JwtModule.register({}),
    PassportModule,
    RedisModule,
  ],
  controllers: [UserController, CategoryController, RoleController],
  providers: [
    AuthJwtAccessStrategy,
    TokenPayloadCheckExist,
    checkNumberLoginFail,
    ResponseDefaultInterceptor,
  ],
})
export class ControllerModule {}
