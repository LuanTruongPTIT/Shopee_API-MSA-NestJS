import { FileUploadSingle } from '@libs/common/file/decorators/file.decorator';
import { IFile } from '@libs/common/file/interface/file.interface';
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadDoc } from '../decorator/file.decorator.docs';

@ApiTags('Upload File')
@Controller('/upload-file')
export class UploadFileController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_UPLOAD_FILE_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_UPLOAD_FILE);
    await this.clientKafka.connect();
  }

  @FileUploadDoc()
  @FileUploadSingle()
  @Post('/upload-file')
  async UpLoadFileEndPoint(
    @UploadedFile()
    file: IFile,
  ) {
    console.log(file);
  }
}
