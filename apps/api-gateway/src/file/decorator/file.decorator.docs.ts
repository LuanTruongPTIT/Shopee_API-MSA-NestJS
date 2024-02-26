import {
  Doc,
  DocDefault,
  DocRequestFile,
} from '@libs/common/docs/decorators/doc.decorators';
import { FileSingleDto } from '@libs/common/file/dto/file.single.dto';
import { HttpStatus, applyDecorators } from '@nestjs/common';

export function FileUploadDoc() {
  return applyDecorators(
    Doc({
      operation: 'modules.upload.file',
    }),
    DocRequestFile({ body: FileSingleDto }),

    // DocResponse('Create category success'),
    DocDefault({
      httpStatus: HttpStatus.BAD_REQUEST,
      messagePath: 'File is not exist',
      statusCode: 400,
    }),
  );
}
