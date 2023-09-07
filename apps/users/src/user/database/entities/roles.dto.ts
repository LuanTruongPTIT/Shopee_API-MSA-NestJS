import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import { ENUM_ROLE_TYPE } from '../../constants/role.enum.constant';
import { ENUM_POLICY_ACTION } from '../../constants/policy.constant';
import { Column } from 'typeorm';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';
export class RoleDto extends BaseEntityDto {
  constructor(
    // name: string,
    // description: string,
    // is_active: boolean,
    // type: ENUM_ROLE_TYPE[],
    // permissions: ENUM_POLICY_ACTION[],
  ) {
    super();
  //   this.name = name;
  //   this.description = description;
  //   this.is_active = is_active;
  //   this.type = type;
  //   this.permissions = permissions;
  // }

  // @IsString()
  // @IsOptional()
  // @Column({ nullable: true, update: false, unique: true })
  // name: string;

  // @IsString()
  // @IsOptional()
  // @Column()
  // description: string;

  // @IsBoolean()
  // @Column({ nullable: false, update: true, default: false })
  // is_active: boolean;

  // @IsArray()
  // @Column({ nullable: false, update: true })
  // type: ENUM_ROLE_TYPE[];

  // @IsArray()
  // @Column({ nullable: false, update: true })
  // permissions: ENUM_POLICY_ACTION[];
  }
}
