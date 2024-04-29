import { NestFactory } from '@nestjs/core';
import { ValidationExceptionFilter } from './filters/ValidationExceptionFilter';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api');
  /*app.useStaticAssets(
    path.resolve('../forumFrontend/dist/forum-frontend/browser'),
  );*/
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
