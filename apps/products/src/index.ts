import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';
import dotenv from 'dotenv';
export const envPath = './apps/products/.env';
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
