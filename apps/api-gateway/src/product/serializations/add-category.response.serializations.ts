import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryResponseBadRequestSerialization {
  @ApiProperty({
    example: '/api/v1/add/category',
  })
  path: string;
}
