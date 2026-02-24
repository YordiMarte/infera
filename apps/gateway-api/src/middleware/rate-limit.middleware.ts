import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
  });

  private readonly LIMIT = 60;
  private readonly WINDOW = 60; // segundos

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKeyHeader = req.headers['x-api-key'];

    if (!apiKeyHeader || Array.isArray(apiKeyHeader)) {
      throw new HttpException('API key missing', HttpStatus.UNAUTHORIZED);
    }

    const apiKey = apiKeyHeader;
    const key = `rate:${apiKey}`;

    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.expire(key, this.WINDOW);
    }

    if (count > this.LIMIT) {
      throw new HttpException(
        'Rate limit exceeded',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
