import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { FileDoc, FileEntity } from '../entities/file.entities';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository extends DatabaseMongoUUIDRepositoryAbstract<
  FileEntity,
  FileDoc
> {
  constructor(
    @DatabaseModel(FileEntity.name)
    private readonly fileModel: Model<FileEntity>,
  ) {
    super(fileModel);
  }
}
