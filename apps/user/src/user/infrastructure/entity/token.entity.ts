/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';

@Entity({ name: 'RefreshTokenEntity' })
export class RefreshTokenEntity extends BaseEntityDto {
  constructor() {
    // this._id = Utils.getUuid();
    super();
  }

  @ObjectIdColumn()
  _id: string;

  @Column()
  userId: string;

  @Column({
    type: 'string',
    // nullable: false,
  })
  refreshToken: string;
}
