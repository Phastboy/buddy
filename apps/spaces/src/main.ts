import { NestFactory } from '@nestjs/core';
import { SpacesModule } from './spaces.module';

async function bootstrap() {
  const app = await NestFactory.create(SpacesModule);
  await app.listen(3000);
}
bootstrap();
