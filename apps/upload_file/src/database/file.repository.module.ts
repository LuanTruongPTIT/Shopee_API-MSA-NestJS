import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileEntity, FileSchema } from './entities/file.entities';
import { FileRepository } from './repository/file.repository';

@Module({
  providers: [FileRepository],
  exports: [FileRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: FileEntity.name,
        schema: FileSchema,
      },
    ]),
  ],
})
export class FileRepositoryModule {}
