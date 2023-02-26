import { NestFactory } from '@nestjs/core';
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

  await app.listen(3000);
}
bootstrap();
