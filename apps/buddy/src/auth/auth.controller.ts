import { Controller, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('users/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      Logger.log('Received registration request', 'AuthController');
      const pattern = { role: 'auth', cmd: 'register' };

      const response = await this.authService.sendMessage(pattern, createUserDto);
      
      // Check if response contains an error status
      if (response.status && response.status !== HttpStatus.CREATED) {
        Logger.error(`Registration error: ${response.message}`, 'AuthController');
        throw new HttpException(
          {
            status: response.status,
            message: response.message,
            details: response.details || 'An error occurred'
          },
          response.status
        );
      }

      Logger.log(`User created: ${response.user?.username}`, 'AuthController');
      return response;
    } catch (error) {
      Logger.error(`Unexpected error: ${error.message}`, 'AuthController');
      throw new HttpException(
        { status: 'error', message: error.message ?? 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
