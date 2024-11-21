import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async welcome() {
    return this.authService.sayHello();
  }

  @Post('users/register')
  async registerUserWithRpc(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.authService.requestAuthRegister(
        createUserDto,
      );
      return {
        message: 'User registration processed',
        response,
      };
    } catch (error) {
      Logger.error('Failed to register user via RPC', error.message, 'AuthController');
      throw new HttpException(
        'Failed to process RPC registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
