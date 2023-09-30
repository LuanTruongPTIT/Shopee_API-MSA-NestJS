import { Injectable } from '@nestjs/common';
import { IHelperHashService } from '../interfaces/helper.hash-service.interface';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
@Injectable()
export class HelperHashService implements IHelperHashService {
  randomSalt(length: number): string {
    return genSaltSync(length);
  }

  bcrypt(password: string, salt: string): string {
    return hashSync(password, salt);
  }

  bcryptCompare(passwordString: string, passwordHashed: string): boolean {
    console.log(passwordString, 'hash', passwordHashed);
    return compareSync(passwordString, passwordHashed);
  }
}
