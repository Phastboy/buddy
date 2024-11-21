import { Controller, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('users/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.sayHello();
  }
}
