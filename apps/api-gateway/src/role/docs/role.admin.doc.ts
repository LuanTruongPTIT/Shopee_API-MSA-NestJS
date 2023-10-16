import { applyDecorators } from '@nestjs/common';
import { Doc } from '../../../../../libs/common/src/docs/decorators/doc.decorators';
export function RoleAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'modules.admin.role',
    }),
  );
}
