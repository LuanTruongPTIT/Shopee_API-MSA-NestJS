import dotenv from 'dotenv';
import { IsNotEmpty, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
export const envPath = './apps/seller_channel/.env';
dotenv.config({ path: envPath });
export class EnvironmentVariables {
  @IsNotEmpty()
  PORT: number;

  @IsNotEmpty()
  SERVICE_NAME: string;
}
export function validate(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validateConfig;
}
