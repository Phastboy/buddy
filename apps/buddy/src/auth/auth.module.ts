import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RabbitmqCoreModule } from '../core/rabbitmq/rabbitmq.module';
import { QueueSetupService } from '../core/rabbitmq/queue-setup.service'

@Module({
  imports: [RabbitmqCoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly queueSetupService: QueueSetupService) {}

  async onModuleInit() {
    // Setup queues for auth-specific purposes
    await this.queueSetupService.setupMultipleQueues([
      {
        queueName: 'auth_register_queue',
        exchangeName: 'auth_exchange',
        routingKey: 'auth.register',
      },
    ]);
  }
}
