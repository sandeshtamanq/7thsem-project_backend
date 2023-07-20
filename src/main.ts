import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  firebaseConfig,
  initializeFirebaseApp,
} from './firebase/firebase.config';
import { APILogger } from './middlewares/apiLogger.middleware';

initializeFirebaseApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(APILogger);

  // app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api', { exclude: ['/'] });

  await app.listen(3000);
}
bootstrap();
