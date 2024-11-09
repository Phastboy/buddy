import { Controller, Post, Body, Logger, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('users/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      Logger.log('Received registration request', 'AuthController');

      // Define the message pattern
      const pattern = { role: 'auth', cmd: 'register' };
      // send user registration data to the microservice
      const response = await this.authService.sendMessage(
        pattern,
        createUserDto,
      );
      console.log(response);
      Logger.log(`User created: ${response.username}`, 'AuthController');
      return response;
    } catch (error) {
      Logger.error(
        `Registration error: ${error.message}`,
        error.stack,
        'AuthController',
      );
      return {
        statusCode: 500,
        message: 'An error occurred during registration',
        details: error.message,
      };
    }
  }
}
