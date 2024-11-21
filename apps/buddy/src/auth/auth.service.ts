import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AuthService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendAuthRegisterMessage(data: any): Promise<void> {
    const exchange = 'auth_exchange';
    const routingKey = 'auth.register';

    try {
      Logger.log(`Publishing message to exchange "${exchange}" with key "${routingKey}"`, 'AuthService');
      await this.amqpConnection.publish(exchange, routingKey, data);
      Logger.log('Message published successfully', 'AuthService');
    } catch (error) {
      Logger.error('Failed to publish message', error.message, 'AuthService');
      throw error;
    }
  }

  async requestAuthRegister(data: any): Promise<any> {
    const exchange = 'auth_exchange';
    const routingKey = 'auth.register';

    try {
      Logger.log(`Requesting data from exchange "${exchange}" with key "${routingKey}"`, 'AuthService');
      const response = await this.amqpConnection.request<any>({
        exchange,
        routingKey,
        payload: data,
        timeout: 5000, // Set timeout for the request
      });
      Logger.log('Received response:', 'AuthService');
      Logger.debug(response, 'AuthService');
      return response;
    } catch (error) {
      Logger.error('Failed to make a request', error.message, 'AuthService');
      throw error;
    }
  }

  async sayHello(): Promise<string> {
    return 'Hello from the auth service!';
  }
}
