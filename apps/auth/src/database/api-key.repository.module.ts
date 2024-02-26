import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeyEntity, ApiKeySchema } from './entites/api-key.entites';
import { ApiKeyRepository } from './repositories/api-key.repository';
@Module({
  providers: [ApiKeyRepository],
  exports: [ApiKeyRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: ApiKeyEntity.name,
        schema: ApiKeySchema,
      },
    ]),
  ],
})
export class ApiKeyRepositoryModule {}
