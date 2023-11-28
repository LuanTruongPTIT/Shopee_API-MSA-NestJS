import { IFile } from '../interface/file.interface';
import { ApiProperty } from '@nestjs/swagger';
export class FileSingleDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Single file',
  })
  file: IFile;
}
