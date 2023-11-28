import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
export function FileUploadSingle(field?: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field ?? 'file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            cb(null, `${file.originalname}`);
          },
        }),
      }),
    ),
  );
}
