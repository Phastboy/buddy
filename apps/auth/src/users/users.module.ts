import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RmqModule } from '../rmq/rmq.module';
import { AuthService } from '../auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
    RmqModule.register('auth', true),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
