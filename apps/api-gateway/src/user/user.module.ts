import { Global, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserPayloadPutToRequestGuard } from './guards/payload/user.payload.put-to-request.guard';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';
import { UserNotFoundGuard } from './guards/user.not-found.guard';
import { UserBlockedGuard } from './guards/user.blocked.guard';
import { UserActiveGuard } from './guards/user.activate.guard';
import { AuthModule } from '../auth/auth.module';
@Global()
@Module({
  imports: [ClientsModule.register(clientModuleOptions)],
  controllers: [UserController],
  providers: [
    UserPayloadPutToRequestGuard,
    UserNotFoundGuard,
    UserBlockedGuard,
    UserActiveGuard,
  ],
  exports: [
    UserPayloadPutToRequestGuard,
    UserNotFoundGuard,
    UserBlockedGuard,
    UserActiveGuard,
  ],
})
export class UserModule {}
