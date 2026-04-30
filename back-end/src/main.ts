import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Gestion des stages')
    .setDescription('API pour la gestion des stages')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('stages')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api-json',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`L'application tourne sur le port: ${await app.getUrl()}`);
}
bootstrap();
