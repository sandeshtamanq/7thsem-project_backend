import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type', 'Access-Control-Allow-Origin'],
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  app.setGlobalPrefix('api', { exclude: ['/'] });
  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('7th Semester Project api documentation')
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ecommerce/documentation', app, document);
  await app.listen(3000);
}
bootstrap();
