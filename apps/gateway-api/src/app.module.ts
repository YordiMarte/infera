import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { RedisModule } from '../src/redis/redis.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
  imports: [RedisModule],
  controllers: [HealthController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RateLimitMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
