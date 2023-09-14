import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventStore } from '@libs/core/event-store/lib/event-store';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { UserCreatedSuccessEvent } from '../events/impl/user-created.event';
import { ClientKafka } from '@nestjs/microservices';
import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
@Injectable()
export class UsersSagas {
  constructor(
    private readonly eventStore: EventStore,
    @Inject(EMicroservice.GATEWAY_AUTH_SERVICE)
    private readonly authClient: ClientKafka,
  ) {
    this.startKafka();
  }

  async startKafka() {
    await this.authClient.connect();
  }

  @Saga()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userCreatedSuccess = (event$: Observable<any>): Observable<void> => {
    return event$.pipe(
      ofType(UserCreatedSuccessEvent),
      map((event: UserCreatedSuccessEvent) => {
        Logger.log(' Inside [UsersSagas] userCreatdSuccess');
        const { tokenEmail } = event;
        this.authClient.emit(
          EKafkaMessage.REQUEST_SEND_VERIFY_EMAIL,
          JSON.stringify(tokenEmail),
        );
      }),
    );
  };
}
