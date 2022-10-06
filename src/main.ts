import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, //NÃO DEIXA PASSAR UM VALOR QUE NÃO EXISTA, PARA TODA A REQUISIÇÃO
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
