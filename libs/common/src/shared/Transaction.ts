// import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';

// import { } from '';
// export function Transactional() {
//   return (
//     target: ICommandHandler | IEventHandler,
//     key: string,
//     descriptor: PropertyDescriptor,
//   ): void => {
//     const originalMethod = descriptor.value as (...args) => Promise<unknown>;
//     // eslint-disable-next-line no-undef
//     descriptor.value = new Proxy(originalMethod, {
//       apply: async (proxyTarget, thisArg, args) => {

//       },
//     });
//   };
// }
