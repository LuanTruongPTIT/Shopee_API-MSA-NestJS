import { Controller, Body, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AwsSesService } from './aws/aws.ses.service';
import { verifyEmailRegisterDTO } from './dto/auth.send-verify.register-email';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly awsSesService: AwsSesService,
  ) {}

  @EventPattern(EKafkaMessage.REQUEST_SEND_VERIFY_EMAIL)
  async sendVerifyRegisterEmail(@Body() data: string): Promise<string> {
    Logger.log('sendVerifyRegisterEmail');
    console.log(data);
    return data;
  }
}
