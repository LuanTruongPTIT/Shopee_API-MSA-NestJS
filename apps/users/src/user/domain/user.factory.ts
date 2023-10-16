import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { User, UserImplement } from './user.public';
type CreateUserOptions = Readonly<{
  email: string;
  tokenEmail: string;
  id: string;
}>;
@Injectable()
export class UserFactory {
  @Inject(EventPublisher)
  private readonly eventPublisher: EventPublisher;

  create(options: CreateUserOptions): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({
        ...options,
      }),
    );
  }
}
