import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'RABBITMQ_AUTH_CLIENT',
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    clientProxy = module.get<ClientProxy>('RABBITMQ_AUTH_CLIENT');
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
  });

  it('should send a message successfully', async () => {
    const pattern = 'test_pattern';
    const data = { key: 'value' };
    const response = { success: true };
    (clientProxy.send as jest.Mock).mockReturnValue(of(response));

    const result = await authService.sendMessage(pattern, data);

    expect(result).toEqual(response);
    expect(clientProxy.send).toHaveBeenCalledWith(pattern, data);
  });

  it('should handle message sending failure', async () => {
    const pattern = 'test_pattern';
    const data = { key: 'value' };
    const error = new Error('Test error');
    (clientProxy.send as jest.Mock).mockReturnValue(throwError(error));

    await expect(authService.sendMessage(pattern, data)).rejects.toThrow(error);
    expect(clientProxy.send).toHaveBeenCalledWith(pattern, data);
  });
});