import { Controller, Inject, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
    constructor(
        @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
        private usersService: UsersService
      ) {}
}
