import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { RedisModule } from './redis/redis.module';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { DatabaseModule } from './database/database.module';
import { InferenceController } from './inference/inference.controller';
import { InferenceService } from './inference/inference.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    DatabaseModule,
  ],
  controllers: [HealthController, InferenceController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RateLimitMiddleware,
    },
    InferenceService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
