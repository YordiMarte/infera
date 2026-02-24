import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  await app.listen(3000, '0.0.0.0');
  console.log('🚀 Gateway API running on http://localhost:3000');
}
bootstrap();
