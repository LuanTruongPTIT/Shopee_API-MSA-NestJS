import { Injectable } from '@nestjs/common';
import { IHelperHashService } from '../interfaces/helper.hash-service.interface';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SHA256, enc } from 'crypto-js';
@Injectable()
export class HelperHashService implements IHelperHashService {
  randomSalt(length: number): string {
    return genSaltSync(length);
  }

  bcrypt(password: string, salt: string): string {
    return hashSync(password, salt);
  }

  bcryptCompare(passwordString: string, passwordHashed: string): boolean {
    // console.log(passwordString, 'hash', passwordHashed);
    return compareSync(passwordString, passwordHashed);
  }

  sha256(string: string): string {
    return SHA256(string).toString(enc.Hex);
  }
}
