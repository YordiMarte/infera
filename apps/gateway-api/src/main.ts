import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { sdk } from './observability/tracing';

async function bootstrap(): Promise<void> {
  sdk.start();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableShutdownHooks();

  await app.listen(3000, '0.0.0.0');

  console.log('🚀 Gateway API running on http://localhost:3000');
}

bootstrap().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
