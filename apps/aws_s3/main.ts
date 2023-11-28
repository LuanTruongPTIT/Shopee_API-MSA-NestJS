import { NestApplication, NestFactory } from '@nestjs/core';
import { AwsS3Module } from './aws.s3.module';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AwsS3Module);
}
