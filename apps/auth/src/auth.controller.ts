import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @EventPattern({ role: 'auth', cmd: 'register' })
    async register(data: CreateUserDto) {
        Logger.log('Received registration event', 'AuthController');
        Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');

        try {
            const createdUser = (await this.userService.create(data)).toObject();
            const { password, ...user } = createdUser;

            const pattern = { role: 'auth', cmd: 'registered' };
            await this.authService.emitEvent(pattern, user);

            Logger.log(`Event emitted for pattern: ${JSON.stringify(pattern)}`, 'AuthController');
            Logger.log(`User created: ${user.username}`, 'AuthController');
        } catch (error) {
            Logger.error(`Failed to create user: ${data.username}. Error: ${error.message}`, error.stack, 'AuthController');
            throw new Error(`Failed to create user: ${data.username}. Error: ${error.message}`);
        }
    }

    @EventPattern({ role: 'auth', cmd: 'registered' })
    async registered(data: any) {
        Logger.log('Received registered event', 'AuthController');
        Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');
    }
}
