// Example usage in a module, e.g., `AuthModule`
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    RmqModule.register('auth'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
