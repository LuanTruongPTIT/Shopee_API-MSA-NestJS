import { Entity, Column } from 'typeorm';
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import { ModelList } from '@libs/common/interfaces/product.interface';

@Entity('Model')
export class Model extends BaseEntityDto {
  constructor() {
    super();
  }

  @Column({})
  model: ModelList;
}
