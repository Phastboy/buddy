import { Controller, Post, Body, Logger, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
    private readonly authService: AuthService
  ) {}

  @Post('users/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      Logger.log('Received registration request', 'AuthController');
      
      // Define the event pattern
      const pattern = { role: 'auth', cmd: 'register' };
      // Emit user registration event
      await this.authService.emitEvent(pattern, createUserDto);
      Logger.log(`Event emitted for pattern: ${JSON.stringify(pattern)}`, 'AuthController');

      // Respond to the client without waiting for event result
      return { statusCode: 202, message: 'Registration request received. Processing...' };

    } catch (error) {
      Logger.error(`Registration error: ${error.message}`, error.stack, 'AuthController');
      return {
        statusCode: 500,
        message: 'An error occurred during registration',
        details: error.message
      };
    }
  }
}
