import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/index';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import databaseConfig from '@libs/common/configs/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { AuthRepositoryModule } from './database/auth.repository.module';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './kafka';
import authConfig from '@libs/common/configs/auth.config';
import { IAuthService } from './interfaces/auth.service.interface';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { HelperModule } from '@libs/common/helper/helper.module';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperEncryptionService } from '@libs/common/helper/services/helper.encryption.service';
@Module({
  imports: [
    // JwtModule.register(config.JWT),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig, authConfig],
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
    JwtModule.register({}),
    ClientsModule.register(clientModuleOptions),
    MongooseModule.forRootAsync({
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    AuthRepositoryModule,
    HelperModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    HelperDateService,
    HelperEncryptionService,
  ],
})
export class AuthModule {}
