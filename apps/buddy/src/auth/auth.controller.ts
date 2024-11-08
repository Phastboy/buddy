import { Controller, Post, Body, Logger, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
  private readonly authClient: AuthService
  ) {}

  @Post('users/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      Logger.log('request is made from the browser to register a user', 'HTTP')
      const response = await this.authClient.send('user.register', createUserDto);

      Logger.log(response, 'send user.register response');

      const { current, next } = response;
      
      Logger.log(current?.status, 'send user.register response status');
      if (current) {
        return {
          status: current.status,
          message: current.data || current.message
        };
      }
    } catch (error) {
      Logger.error(`Registration error: ${JSON.stringify(error)}`, 'Users controller register Method');
      return { statusCode: 500, message: 'An error occurred during registration', details: error.message };
    }    
  }
}