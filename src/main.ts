// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable cookie parser (if needed for JWT refresh logic, etc.)
  app.use(cookieParser());

  // Allow CORS (adjust origin as needed)
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,
  });

  await app.listen(4000);
  console.log('Server is running on http://localhost:4000');
}
bootstrap();
