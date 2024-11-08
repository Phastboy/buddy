import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Module({
  imports: [ConfigModule], // Import ConfigModule so ConfigService is available
})
export class RmqModule {
  static register(queueName: string): DynamicModule {
    const clientToken = `RABBITMQ_${queueName.toUpperCase()}_CLIENT`;

    return {
      module: RmqModule,
      imports: [ConfigModule], // Ensure ConfigModule is included in the imports array
      providers: [
        {
          provide: clientToken,
          useFactory: (configService: ConfigService) => {
            const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');
            const queue = configService.get<string>(`RABBITMQ_${queueName.toUpperCase()}_QUEUE`);

            Logger.log(`RabbitMQ configuration for ${queueName}`);
            Logger.log(`RabbitMQ dependency injection token: ${clientToken}`);
            Logger.log(`RabbitMQ URL: ${rabbitMqUrl}`);
            Logger.log(`RabbitMQ Queue: ${queue}`);


            if (!rabbitMqUrl || !queue) {
              throw new Error(`RabbitMQ configuration for ${queueName} is missing`);
            }

            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [rabbitMqUrl],
                queue,
                queueOptions: {
                  durable: configService.get<boolean>('RABBITMQ_QUEUE_DURABLE', true),
                  noAck: configService.get<boolean>('RABBITMQ_NO_ACK', false),
                },
              },
            });
          },
          inject: [ConfigService], // Inject ConfigService
        },
      ],
      exports: [clientToken],
    };
  }
}
