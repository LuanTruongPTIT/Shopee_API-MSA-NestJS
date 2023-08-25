/* istanbul ignore file */
import { plainToInstance, Transform } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';
import _ from 'lodash';
import dotenv from 'dotenv';

export const envPath = './apps/users/.env';
dotenv.config({ path: envPath });

export class EnvironmentVariables {
  @IsNotEmpty()
  PORT: number;

  @IsNotEmpty()
  SERVICE_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
