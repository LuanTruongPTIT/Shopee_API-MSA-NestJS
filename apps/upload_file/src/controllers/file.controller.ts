import { EKafkaMessage } from '@libs/common/interfaces';
import { FileUploadSerialization } from '@libs/common/serializations/file/file-upload.serialization';
import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileEntity } from '../database/entities/file.entities';

@Controller()
export class FileController {
  @MessagePattern(EKafkaMessage.REQUEST_UPLOAD_FILE)
  async CreateFile(@Body() data: FileEntity) {
    console.log(data);
  }
}
