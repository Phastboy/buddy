import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response/response.interceptor';

const port = process.env.PORT || 3100;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor)

  const config = new DocumentBuilder()
    .setTitle('Buddy')
    .setDescription('Buddy API documentation')
    .setVersion('0.0.1')
    .addTag('buddy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(port);
  Logger.log(`Buddy app is listening at ${port}`, 'Buddy');
}
bootstrap();
