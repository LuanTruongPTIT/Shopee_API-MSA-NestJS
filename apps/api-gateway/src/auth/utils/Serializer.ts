/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: any, done: Function) {
    console.log('Serializer User');
    console.log(user);
    done(null, user);
  }

  deserializeUser(payload: any) {
    console.log('eserialize User');
    return payload.id;
  }
}
