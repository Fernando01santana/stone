import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptions } from './shared/exceptions/globalExceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptions())
  await app.listen(3000);
}
bootstrap();
