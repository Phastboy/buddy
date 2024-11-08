import { NestFactory } from '@nestjs/core';
import { SpacesModule } from './spaces.module';
import { Logger } from '@nestjs/common';

const port=process.env.PORT || 3102;

async function bootstrap() {
  const app = await NestFactory.create(SpacesModule);
  await app.listen(port);

  Logger.log(`Spaces service is listening at ${port}`, 'Spaces');
}
bootstrap();
