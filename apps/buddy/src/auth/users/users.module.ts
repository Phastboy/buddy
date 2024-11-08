import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from '../auth.service';
import { RmqModule } from '../../rmq/rmq.module';

@Module({
  imports: [
    RmqModule.register('auth'),
    ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
