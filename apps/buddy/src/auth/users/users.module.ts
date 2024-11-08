import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from '../auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_AUTH_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth',
          queueOptions: { durable: true },
        },
      },
    ]),],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
