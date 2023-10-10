import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
const DEFAULT_ISOLATION_LEVEL: IsolationLevel = 'READ COMMITTED';
export abstract class ITransactionRunner {
  abstract startTransaction(): Promise<void>;
  abstract commitTransaction(): Promise<void>;
  abstract rollbackTransaction(): Promise<void>;
  abstract releaseTransaction(): Promise<void>;
}
export class TransactionRunner implements ITransactionRunner {
  private hasTransactionDestroyed = false;
  constructor(private readonly queryRunner: QueryRunner) {}

  async startTransaction(
    isolationLevel: IsolationLevel = DEFAULT_ISOLATION_LEVEL,
  ): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      return;
    }
    return this.queryRunner.startTransaction(isolationLevel);
  }

  async commitTransaction(): Promise<void> {
    if (this.hasTransactionDestroyed) return;
    return this.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    if (this.hasTransactionDestroyed) return;
    return this.queryRunner.rollbackTransaction();
  }

  async releaseTransaction(): Promise<void> {
    this.hasTransactionDestroyed = true;
    return this.queryRunner.release();
  }

  get transactionManager(): EntityManager {
    return this.queryRunner.manager;
  }
}
