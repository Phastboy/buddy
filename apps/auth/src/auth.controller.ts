import { Controller, Logger, HttpStatus } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @MessagePattern({ role: 'auth', cmd: 'register' })
  async register(data: CreateUserDto) {
    Logger.log('Received registration request', 'AuthController');
    Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');

    try {
      const user = await this.userService.create(data);
      const userObject = user.toObject();
      Logger.log(`User created: ${userObject.username}`, 'AuthController');

      const pattern = { role: 'auth', cmd: 'registered' };
      await this.authService.emitEvent(pattern, userObject);
      Logger.log(`Event emitted for pattern: ${JSON.stringify(pattern)}`, 'AuthController');

      return { status: HttpStatus.CREATED, message: 'User registered successfully', user: userObject };
    } catch (error) {
      Logger.error(`Error: ${error.message}`, 'AuthController');
      
      return {
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Registration failed',
        details: error.response || 'Internal server error'
      };
    }
  }

  @EventPattern({ role: 'auth', cmd: 'registered' })
  async registered(data: any) {
    Logger.log('Received registered event', 'AuthController');
    Logger.log(`Data: ${JSON.stringify(data)}`, 'AuthController');
  }
}
