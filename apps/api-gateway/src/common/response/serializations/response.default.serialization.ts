/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
// import { IMessage } from '../../../docs/interfaces/message.interface';
export class ResponseMetadataSerialization {
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;

  // eslint-disable-next-line no-undef
  [key: string]: any;
}
export class ResponseDefaultSerialization<T = Record<string, any>> {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    required: true,
    nullable: false,
    description: 'return specific status code for every endpoints',
    example: 200,
  })
  statusCode: number;

  // @ApiProperty({
  //   name: 'message',
  //   required: true,
  //   nullable: false,
  //   description: 'Message base on languase',
  //   oneOf: [
  //     {
  //       type: 'string',
  //       example: 'message endpoint',
  //     },
  //     {
  //       type: 'object',
  //       example: {
  //         en: 'Welcome to shop dev',
  //         vn: 'Chao mung toi shop dev',
  //       },
  //     },
  //   ],
  // })
  // message: string | IMessage;

  @ApiProperty({
    name: '_metadata',
    required: true,
    nullable: false,
    description: ' Container metadata about API',
    type: 'object',
    example: {
      languages: ['en'],
      timestamp: 169940404,
      timezone: 'Asia/HoChiMinh',
      requestId: ' 40c2f734-7247-472b-bc26-8eff6e669781',
      path: '/api/v1/user/',
    },
  })
  _metadata: ResponseMetadataSerialization;

  data?: T;
}
