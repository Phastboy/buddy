import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy) {}

  create(createAuthDto: CreateAuthDto) {
    return {
      createAuthDto,
    }
  }


  getHello(): any {
    return {
      message: 'Auth feature coming soon!',
      description: 'This feature is currently under development.',
    };
  }
}
