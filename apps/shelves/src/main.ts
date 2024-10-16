import { NestFactory } from '@nestjs/core';
import { ShelvesModule } from './shelves.module';

async function bootstrap() {
  const app = await NestFactory.create(ShelvesModule);
  await app.listen(3000);
}
bootstrap();
