import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { FileEntity } from '../database/entities/file.entities';

export const IFileService = Symbol.for('IFileSerivce');
export interface IFileSerivce {
  createFileUpload(data: FileEntity): Promise<IResponse>;
}
