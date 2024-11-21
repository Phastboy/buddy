import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

export interface QueueSetupOptions {
  queueName: string;
  exchangeName: string;
  routingKey: string;
}

@Injectable()
export class QueueSetupService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async setupQueue(options: QueueSetupOptions): Promise<void> {
    const { queueName, exchangeName, routingKey } = options;

    try {
      // Declare the queue
      await this.amqpConnection.channel.assertQueue(queueName, {
        durable: true,
      });

      // Bind the queue to the exchange with the given routing key
      await this.amqpConnection.channel.bindQueue(queueName, exchangeName, routingKey);

      Logger.log(
        `Queue "${queueName}" bound to exchange "${exchangeName}" with routing key "${routingKey}"`,
        'QueueSetupService',
      );
    } catch (error) {
      Logger.error(
        `Failed to setup queue "${queueName}" for exchange "${exchangeName}"`,
        error.message,
        'QueueSetupService',
      );
      throw error;
    }
  }
}
