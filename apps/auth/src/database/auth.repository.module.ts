import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './repositories/Auth.repository';
import { TokenEntity, TokenSchema } from './entites/token.entites';
@Module({
  providers: [AuthRepository],
  exports: [AuthRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: TokenEntity.name,
        schema: TokenSchema,
      },
    ]),
  ],
})
export class AuthRepositoryModule {}
