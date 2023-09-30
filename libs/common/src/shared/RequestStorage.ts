// eslint-disable-next-line no-unused-vars
import { InternalServerErrorException } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
export class Storage {
  constructor(readonly transactionDepth = 0) {}
}
interface RequestStorage {
  // reset: () => void;
  resetTransactionDepth: () => void;
  increaseTransactionDepth: () => void;
  decreaseTransactionDepth: () => void;
}
class RequestStorageImplement implements RequestStorage {
  constructor(private readonly storage = new AsyncLocalStorage<Storage>()) {}

  resetTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({ ...storage, transactionDepth: 0 });
  }

  increaseTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({
      ...storage,
      transactionDepth: storage.transactionDepth + 1,
    });
  }

  decreaseTransactionDepth(): void {
    const storage = this.getStorage();
    this.storage.enterWith({
      ...storage,
      transactionDepth: storage.transactionDepth - 1,
    });
  }

  getStorage(): Storage {
    const storage = this.storage.getStore();
    console.log(storage);
    if (!storage) {
      throw new InternalServerErrorException('RequestStorage is not found');
    }
    return storage;
  }
}
export const RequestStorage = new RequestStorageImplement();
