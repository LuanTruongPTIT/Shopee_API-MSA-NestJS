// import { Controller, Body, Logger, OnModuleInit, Inject } from '@nestjs/common';
// import { ClientKafka, MessagePattern } from '@nestjs/microservices';
// import { AuthService } from '../auth.service';
// import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces/kafka.interface';
// import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
// @Controller()
// export class AuthController implements OnModuleInit {
//   constructor(
//     private readonly authService: AuthService,
//     @Inject(EMicroservice.GATEWAY_USER_SERVICE)
//     private readonly clientKafka_user: ClientKafka,
//     @Inject(EMicroservice.GATEWAY_ROLE_SERVICE)
//     private readonly clientKafka_role: ClientKafka,
//   ) { }

//   async onModuleInit() {
//     this.clientKafka_user.subscribeToResponseOf()
//   }

//   @MessagePattern(EKafkaMessage.REQUEST_LOGIN)
//   async signIn(@Body() data: UserLoginDto): Promise<void> {
//     Logger.log('sendVerifyRegisterEmail');
//     console.log(data);
//     // return data;
//   }
// }
