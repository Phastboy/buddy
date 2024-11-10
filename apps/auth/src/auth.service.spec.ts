import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';

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
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    clientProxy = module.get<ClientProxy>('RABBITMQ_AUTH_CLIENT');
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
  });

  it('should emit an event successfully', async () => {
    const pattern = 'test_pattern';
    const data = { key: 'value' };
    const emitMock = jest.fn().mockReturnValue({
      subscribe: ({ complete }) => complete(),
    });
    (clientProxy.emit as jest.Mock).mockImplementation(emitMock);

    const result = await authService.emitEvent(pattern, data);

    expect(result).toBe(true);
    expect(clientProxy.emit).toHaveBeenCalledWith(pattern, data);
    expect(Logger.log).toHaveBeenCalledWith(
      `Event emitted for pattern: ${JSON.stringify(pattern)}`,
      'AuthService',
    );
  });

  it('should handle event emission failure', async () => {
    const pattern = 'test_pattern';
    const data = { key: 'value' };
    const error = new Error('Test error');
    const emitMock = jest.fn().mockReturnValue({
      subscribe: ({ error: errorCallback }) => errorCallback(error),
    });
    (clientProxy.emit as jest.Mock).mockImplementation(emitMock);

    await expect(authService.emitEvent(pattern, data)).rejects.toThrow(error);
    expect(clientProxy.emit).toHaveBeenCalledWith(pattern, data);
    expect(Logger.error).toHaveBeenCalledWith(
      `Failed to emit event for pattern: ${JSON.stringify(pattern)}. Error: ${error.message}`,
      error.stack,
      'AuthService',
    );
  });
});