// import { } from '';
import { IEvent } from '@nestjs/cqrs';
export class CreateUserSuccessEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly tokenEmail: string,
  ) {}
}
