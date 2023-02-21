import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import {
  firebaseConfig,
  initializeFirebaseApp,
} from './firebase/firebase.config';

initializeFirebaseApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

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
