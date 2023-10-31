import { JwtService } from '@nestjs/jwt';
import { IHelperEncryptionService } from '../interfaces/helper.encryption-service.interface';
import { IHelperJwtOptions } from '../interfaces/helper.interface';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HelperEncryptionService implements IHelperEncryptionService {
  constructor(private readonly jwtService: JwtService) {}
  jwtEncrypt(payload: Record<string, any>, options: IHelperJwtOptions): string {
    return this.jwtService.sign(payload, {
      secret: options.secretKey,
      expiresIn: options.expiredIn,
      notBefore: options.notBefore ?? 0,
      audience: options.audience,
      issuer: options.issuer,
      subject: options.subject,
    });
  }
}
