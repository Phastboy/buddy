import { Controller, Inject, Logger } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @MessagePattern({ role: 'auth', cmd: 'register' })
  async register(data: CreateUserDto) {
    Logger.log('Received registration request', 'AuthController');
    Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');

    try {
      const result = await this.userService.create(data);

      if (result.success) {
        const user = result.data.toObject();
        Logger.log(`User created: ${user.username}`, 'AuthController');
        const pattern = { role: 'auth', cmd: 'registered' };
        await this.authService.emitEvent(pattern, user);
        Logger.log(
          `Event emitted for pattern: ${JSON.stringify(pattern)}`,
          'AuthController',
        );
        return {
          success: true,
          user,
        };
      }
      return result;
    } catch (error) {
      Logger.error(
        `Failed to create user: ${data.username}. Error: ${error.message}`,
        error.stack,
        'AuthController',
      );
      return { status: 'error', message: error.message };
    }
  }

  @EventPattern({ role: 'auth', cmd: 'registered' })
  async registered(data: any) {
    Logger.log('Received registered event', 'AuthController');
    Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');
  }
}
