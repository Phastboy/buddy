import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy) {}

    @EventPattern({ role: 'auth', cmd: 'register' })
    async register(data: CreateUserDto) {
        Logger.log('Received registration event', 'AuthController');
        Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');
    }
}
