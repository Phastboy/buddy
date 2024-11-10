import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/register.dto';
import { Logger } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let usersService: UsersService;
  let authService: AuthService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'RABBITMQ_AUTH_CLIENT',
          useValue: { emit: jest.fn() },
        },
        {
          provide: UsersService,
          useValue: { create: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: { emitEvent: jest.fn() },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    clientProxy = module.get<ClientProxy>('RABBITMQ_AUTH_CLIENT');
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
  });

  it('should return an error for duplicate key', async () => {
    const userDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const error = { code: 11000, keyPattern: { username: 1 }, message: 'Duplicate key error', stack: 'Error stack' };
    (usersService.create as jest.Mock).mockRejectedValue(error);

    const result = await authController.register(userDto);

    expect(result).toEqual({ status: 'error', message: error.message });
    expect(Logger.error).toHaveBeenCalledWith(
      `Failed to create user: ${userDto.username}. Error: ${error.message}`,
      error.stack,
      'AuthController',
    );
  });
});