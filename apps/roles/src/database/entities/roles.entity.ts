import { AbstractEntityUuid } from '@libs/infra/database/postgresql/abstract.entity';
import { Column, Entity } from 'typeorm';
import { ENUM_ROLE_TYPE } from '../../constants/role.enum.constant';
import { ENUM_POLICY_ACTION } from '../../constants/policy.constant';
@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntityUuid<RoleEntity> {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: boolean;

  @Column()
  type: ENUM_ROLE_TYPE[];

  @Column()
  permissions: ENUM_POLICY_ACTION[];
}
