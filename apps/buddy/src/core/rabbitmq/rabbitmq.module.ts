import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueSetupService } from './queue-setup.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('RABBITMQ_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueueSetupService],
  exports: [QueueSetupService, RabbitMQModule],
})
export class RabbitmqCoreModule {}
