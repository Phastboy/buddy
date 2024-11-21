import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { QueueSetupService } from './core/rabbitmq/queue-setup.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RabbitmqCoreModule } from './core/rabbitmq/rabbitmq.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        uri: process.env.RABBITMQ_URI || 'amqp://localhost', // RabbitMQ connection URI
        exchanges: [
          {
            name: 'auth_exchange',
            type: 'topic',
          },
        ],
      }),
    }),
    AuthModule,
    RabbitmqCoreModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
