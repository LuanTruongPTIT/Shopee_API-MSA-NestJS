import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';
import { IFile } from '@libs/common/file/interface/file.interface';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Thoi trang nam',
  })
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ApiHideProperty()
  isParent: boolean;

  // @ApiProperty({
  //   type: 'string',
  //   format: 'binary',
  //   description: 'Single file',
  // })
  // @IsNotEmpty()
  @ApiProperty({
    description: 'Attachments',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  readonly file: IFile;

  @ApiProperty({
    example: '3rd Level Category',
    required: false,
    enum: [
      'Category Primary',
      'Subcategory',
      '3rd Level Category',
      '4th Level Category',
      '5th level Category',
    ],
  })
  @IsOptional()
  level: CATEGORY_PRODUCT_LEVEL;

  @ApiHideProperty()
  isActive: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      items: {
        type: 'string',
        // format: 'binary',
      },
    },
  })
  @IsString()
  @IsOptional()
  category_parent_id: Array<string>;
}
