import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { switchMap, of, Observable } from 'rxjs';
import { formatResource } from './utils';
@Injectable()
export class ResourceSerialization implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        if (!response) return of(response);
        return [formatResource(response)];
      }),
    );
  }
}
