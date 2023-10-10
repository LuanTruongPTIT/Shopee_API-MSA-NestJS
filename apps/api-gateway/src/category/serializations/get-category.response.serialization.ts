import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryResponseSerialization {
  @ApiProperty({
    example: '/api/v1/category',
  })
  path: string;

  @ApiProperty({
    example: {
      category_list: [
        {
          category_id: 123,
          original_category_name: 'Thời trang nam',
          display_category_name: 'Thời trang nam',
          has_children: false,
          category_children: [
            {
              category_id: 345,
              parent_category_id: 123,
              original_category_name: 'Hoodie & Áo nỉ',
              display_category_name: 'Hoodie & Áo nỉ',
              has_children: true,
              category_children: [
                {
                  category_id: 567,
                  parent_category_id: 345,
                  original_category_name: 'Áo nỉ',
                  display_category_name: 'Áo nỉ',
                  has_children: false,
                },
                {
                  category_id: 568,
                  parent_category_id: 345,
                  original_category_name: 'Áo mưa',
                  display_category_name: 'Áo mưa',
                  has_children: false,
                },
              ],
            },
          ],
        },
      ],
    },
  })
  data: object;
}
