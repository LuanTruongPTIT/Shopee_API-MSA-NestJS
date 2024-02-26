import { ConfigService } from '@nestjs/config';
import {
  IApiKeyCreated,
  IApiKeyService,
} from '../interfaces/api-key.service.interface';
import { Injectable } from '@nestjs/common';
import { HelperStringService } from '@libs/common/helper/services/helper.string.service';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { ApiKeyCreateDto } from '@libs/common/dto/auth/api-key/api-key.create.dto';
import { IDatabaseCreateOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
import { ApiKeyEntity } from '../database/entites/api-key.entites';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { ApiKeyRepository } from '../database/repositories/api-key.repository';
@Injectable()
export class ApiKeyService implements IApiKeyService {
  private readonly env: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly helperStringService: HelperStringService,
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {
    this.env = this.configService.get<string>('app.env');
  }

  async create(
    { name, type, startDate, endDate }: ApiKeyCreateDto,
    options?: IDatabaseCreateOptions,
  ): Promise<IApiKeyCreated> {
    const key = await this.createKey();
    const secret = await this.createSecret();
    const hash: string = await this.createHashApiKey(key, secret);
    const dto: ApiKeyEntity = new ApiKeyEntity();
    dto.name = name;
    dto.type = type;
    dto.isActive = true;
    dto.key = key;
    dto.hash = hash;
    // dto.startDate = startDate;
    // dto.endDate = endDate;

    if (startDate && endDate) {
      dto.startDate = this.helperDateService.startOfDay(startDate);
      dto.endDate = this.helperDateService.startOfDay(endDate);
    }
    const created = await this.apiKeyRepository.create(dto, options);
    return {
      doc: created,
      secret,
    };
  }

  async createKey(): Promise<string> {
    return this.helperStringService.random(25, {
      safe: false,
      upperCase: true,
      prefix: `${this.env}_`,
    });
  }

  async createSecret(): Promise<string> {
    return this.helperStringService.random(35, {
      safe: true,
      upperCase: false,
    });
  }

  async createHashApiKey(key: string, secret: string): Promise<string> {
    return this.helperHashService.sha256(`${key}:${secret}`);
  }
}
