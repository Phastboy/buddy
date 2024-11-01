import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy) {}

  register(user: any): any {

    console.log('registering user...');
    console.log('user:', user);

    return this.client.send('auth.register', user);
  }
}
