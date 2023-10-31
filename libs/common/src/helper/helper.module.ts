import { Global, Module } from '@nestjs/common';
import { HelperNumberService } from './services/helper.number.service';
import { HelperHashService } from './services/helper.hash.service';
import { HelperDateService } from './services/helper.date.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HelperEncryptionService } from './services/helper.encryption.service';
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('helper.jwt.defaultSecretKey'),
        signOptions: {
          expiresIn: configService.get<string>(
            'helper.jwt.defaultExpirationTime',
          ),
        },
      }),
    }),
  ],
  providers: [
    HelperNumberService,
    HelperHashService,
    HelperDateService,
    HelperEncryptionService,
  ],
  exports: [
    HelperNumberService,
    HelperHashService,
    HelperDateService,
    HelperEncryptionService,
  ],
})
export class HelperModule {}
