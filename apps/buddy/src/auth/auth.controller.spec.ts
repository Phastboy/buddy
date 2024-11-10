import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Logger } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'RABBITMQ_AUTH_CLIENT',
          useValue: { send: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: { sendMessage: jest.fn() },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    clientProxy = module.get<ClientProxy>('RABBITMQ_AUTH_CLIENT');
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
  });

  it('should register a user successfully', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const response = { username: 'testuser' };
    (authService.sendMessage as jest.Mock).mockResolvedValue(response);

    const result = await authController.register(createUserDto);

    expect(result).toEqual(response);
    expect(authService.sendMessage).toHaveBeenCalledWith({ role: 'auth', cmd: 'register' }, createUserDto);
    expect(Logger.log).toHaveBeenCalledWith('Received registration request', 'AuthController');
    expect(Logger.log).toHaveBeenCalledWith(`User created: ${response.username}`, 'AuthController');
  });

  it('should handle registration failure', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const error = new Error('Test error');
    (authService.sendMessage as jest.Mock).mockRejectedValue(error);

    const result = await authController.register(createUserDto);

    expect(result).toEqual({
      statusCode: 500,
      message: 'An error occurred during registration',
      details: error.message,
    });
    expect(authService.sendMessage).toHaveBeenCalledWith({ role: 'auth', cmd: 'register' }, createUserDto);
    expect(Logger.error).toHaveBeenCalledWith(
      `Registration error: ${error.message}`,
      error.stack,
      'AuthController',
    );
  });
});