import { Injectable } from '@nestjs/common';
import { IHelperIdManagement } from '../interfaces/helper.id.management.interface';
@Injectable()
export class HelperIdManagementService implements IHelperIdManagement {
  pushID(_id: Array<string>) {
    const data = [];
    _id.forEach((item) => {
      if (item) {
        data.push(item);
      }
    });
    return data;
  }
}
