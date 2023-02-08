import Cors from '../src/config/cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Core API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const originRegex = new RegExp(Cors.originRegex);
  const allowedOrigins = Cors.allowedOrigins.split(',');

  const corsOption = {
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.indexOf(origin) !== -1 || originRegex.test(origin)) {
        callback(null, true);
      } else {
        console.log('origin-',origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.enableCors(corsOption);
  await app.listen(8000);
}
bootstrap();
