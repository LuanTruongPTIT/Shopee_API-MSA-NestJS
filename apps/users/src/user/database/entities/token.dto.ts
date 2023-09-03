import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import { Entity, Column } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
@Entity('tokens')
export class TokenDto extends BaseEntityDto {
  constructor(token: string, userId: string, iat: number, exp: number) {
    super();
    this.token = token;
    this.userId = userId;
    this.iat = iat;
    this.exp = exp;
  }

  @IsString()
  @Column()
  token: string;

  @IsString()
  @Column()
  userId: string;

  @IsNumber()
  @Column()
  iat: number;

  @IsNumber()
  @Column()
  exp: number;
}
