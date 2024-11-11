import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => ({
        success: true,
        statusCode: context.switchToHttp().getResponse().statusCode || HttpStatus.OK,
        response,
      })),
      catchError((err) => {
        const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        return new Observable((subscriber) => {
          subscriber.next({
            success: false,
            statusCode: status,
            message: err.response?.message || err.message || 'An error occurred',
            error: err.response?.error
          });
          subscriber.complete();
        });
      }),
    );
  }
}
