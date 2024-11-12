import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
              private jwtService: JwtService
  ) {}

  async emitEvent(pattern: any, data: any) {
    return new Promise((resolve, reject) => {
      this.client.emit(pattern, data).subscribe({
        complete: () => {
          Logger.log(
            `Event emitted for pattern: ${JSON.stringify(pattern)}`,
            'AuthService',
          );
          resolve(true);
        },
        error: (err) => {
          Logger.error(
            `Failed to emit event for pattern: ${JSON.stringify(pattern)}. Error: ${err.message}`,
            err.stack,
            'AuthService',
          );
          reject(err);
        },
      });
    });
  }

  async generateToken(payload: {
    username: string,
    email: string,
    UserId: any 
  }): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
