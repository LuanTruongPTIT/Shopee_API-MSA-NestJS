import { ENUM_FILE_STATUS_CODE_ERROR } from './../constants/file.status-code.constants';
import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { IFile } from '../interface/file.interface';

export class FileRequiredPipe implements PipeTransform {
  async transform(value: IFile | IFile[]): Promise<IFile | IFile[]> {
    await this.validate(value);
    return value;
  }

  async validate(value: IFile | IFile[]): Promise<void> {
    console.log(value);
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new UnprocessableEntityException({
        statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_NEEDED_ERROR,
        message: 'file.error.notFound',
      });
    }
  }
}
