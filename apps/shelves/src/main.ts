import { NestFactory } from '@nestjs/core';
import { ShelvesModule } from './shelves.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 3101;

async function bootstrap() {
  const app = await NestFactory.create(ShelvesModule);
  await app.listen(port);

  Logger.log(`Shelves service is listening at ${port}`, 'Shelves');
}
bootstrap();
