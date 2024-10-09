import { Controller, Get } from '@nestjs/common';
import { ShelvesService } from './shelves.service';

@Controller()
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Get()
  getHello(): string {
    return this.shelvesService.getHello();
  }
}
