import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  async sayHello(){
    return {
      message: "welcome to auth",
      description: "this feature is under development"
    }
  }
}
