import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
    private usersService: UsersService
  ) {}
}