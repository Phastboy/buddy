import { Controller, Post, Body, Inject, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from '../auth.service';

@Controller('auth/users')
export class UsersController {
}
