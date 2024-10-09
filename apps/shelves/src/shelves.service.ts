import { Injectable } from '@nestjs/common';

@Injectable()
export class ShelvesService {
  getHello(): string {
    return 'Hello World!';
  }
}
