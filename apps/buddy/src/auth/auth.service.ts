import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy) {}

  async send(pattern: string, data: any) {
    return await lastValueFrom(this.client.send(pattern, data), {
        defaultValue: {
            status: 'error',
            message: 'No response from auth microservice'
        }
    });
  }
}
