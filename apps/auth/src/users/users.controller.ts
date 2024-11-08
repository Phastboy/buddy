import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
    constructor(
        @Inject('RABBITMQ_AUTH_CLIENT') private client: ClientProxy,
        private usersService: UsersService
      ) {}
    
      @EventPattern('user.register')
      async register(@Payload() user: CreateUserDto) {
        try {
          const createdUser = await this.usersService.create(user);
          const { password, ...userWithoutPassword} = createdUser.toObject();
          // Emit successful registration
          this.client.emit('user.registered', userWithoutPassword);
          return { status: 'success', data: userWithoutPassword };
        } catch (error) {
          if (error.message.includes('Username or Email already exists')) {
            return { status: 'error', message: 'Username or Email already exists' };
          }
          return { status: 'error', message: 'Failed to register user', details: error.message };
        }
      }

      @EventPattern('user.registered')
      handleUserRegisteredEvent(@Payload() data: any) {
        console.log({
          'User registered event received': data
        });
      }
}
