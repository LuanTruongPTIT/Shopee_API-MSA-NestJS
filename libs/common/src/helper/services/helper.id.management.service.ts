import { Injectable } from '@nestjs/common';
import { IHelperIdManagement } from '../interfaces/helper.id.management.interface';
import { v1 as uuidv1 } from 'uuid';
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

  generateId() {
    return uuidv1();
  }
}
