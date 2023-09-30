import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';
import { writeConnection } from './Database.module';
import { RequestStorage } from './RequestStorage';
export function Transactional() {
  return (
    target: ICommandHandler | IEventHandler,
    key: string,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod = descriptor.value as (...args) => Promise<unknown>;
    // eslint-disable-next-line no-undef
    descriptor.value = new Proxy(originalMethod, {
      apply: async (proxyTarget, thisArg, args) => {
        if (writeConnection.isTransactionActive) {
          RequestStorage.increaseTransactionDepth();
        }
        if (!writeConnection.isTransactionActive) {
          RequestStorage.resetTransactionDepth();
          await writeConnection.startTransaction();
        }
        try {
          const result = await proxyTarget.apply(thisArg, args);
          if (
            writeConnection.isTransactionActive &&
            RequestStorage.getStorage().transactionDepth <= 0
          ) {
            await writeConnection.commitTransaction();
          }
          if (
            writeConnection.isTransactionActive &&
            RequestStorage.getStorage().transactionDepth <= 0
          ) {
            RequestStorage.decreaseTransactionDepth();
          }
          return result;
        } catch (error) {
          if (
            writeConnection.isTransactionActive &&
            RequestStorage.getStorage().transactionDepth <= 0
          ) {
            await writeConnection.rollbackTransaction();
          }
          if (
            writeConnection.isTransactionActive &&
            RequestStorage.getStorage().transactionDepth > 0
          ) {
            RequestStorage.decreaseTransactionDepth();
          }
          throw error.stack;
        }
      },
    });
  };
}
