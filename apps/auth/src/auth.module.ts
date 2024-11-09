import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RmqModule } from './rmq/rmq.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    RmqModule.register('auth', true),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow('LOCAL_MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [AuthService],
})
export class AuthModule {}
