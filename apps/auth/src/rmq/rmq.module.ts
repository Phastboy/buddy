import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
})
export class RmqModule {
  static register(queueName: string, isConsumer: boolean = true): DynamicModule {
    const clientToken = `RABBITMQ_${queueName.toUpperCase()}_CLIENT`;

    return {
      module: RmqModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: clientToken,
          useFactory: (configService: ConfigService) => {
            const rabbitMqUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
            const queue = configService.get<string>(`RABBITMQ_${queueName.toUpperCase()}_QUEUE`) || queueName;

            Logger.log(`Configuring RabbitMQ for queue: ${queueName}`);
            Logger.log(`RabbitMQ URL: ${rabbitMqUrl}`);
            Logger.log(`Queue Name: ${queue}`);
            Logger.log(`Consumer Mode: ${isConsumer}`);

            if (!rabbitMqUrl || !queue) {
              throw new Error(`RabbitMQ configuration missing for ${queueName}`);
            }

            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [rabbitMqUrl],
                queue,
                queueOptions: {
                  durable: configService.get<boolean>('RABBITMQ_QUEUE_DURABLE', true),
                  noAck: !isConsumer,
                },
              },
            });
          },
          inject: [ConfigService],
        },
      ],
      exports: [clientToken],
    };
  }
}
