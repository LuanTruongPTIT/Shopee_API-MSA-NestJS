import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestStorage, Storage } from './RequestStorage';
import { AsyncLocalStorage } from 'async_hooks';

export class RequestStorageMiddleware implements NestMiddleware {
  constructor(private readonly storage = new AsyncLocalStorage<Storage>()) {}
  use(request: Request, response: Response, next: () => void): void {
    this.storage.run(new Storage(), () => {
      next();
    });
  }
}
