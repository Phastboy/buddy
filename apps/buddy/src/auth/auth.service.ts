import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy) {}

  async emitEvent(pattern: any, data: any) {
    return new Promise((resolve, reject) => {
      this.client.emit(pattern, data).subscribe({
        complete: () => {
          Logger.log(`Event emitted for pattern: ${pattern}`, 'AuthService');
          resolve(true);
        },
        error: (err) => {
          Logger.error(`Failed to emit event for pattern: ${pattern}. Error: ${err.message}`, err.stack, 'AuthService');
          reject(err);
        },
      });
    });
  }
}
