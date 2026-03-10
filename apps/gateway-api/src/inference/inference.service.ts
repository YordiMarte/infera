import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usage } from '../database/usage.entity';

@Injectable()
export class InferenceService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @InjectRepository(Usage)
    private readonly usageRepo: Repository<Usage>,
  ) {}

  async infer(apiKey: string, prompt: string, model: string) {
    const cacheKey = `infer:${model}:${prompt}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return {
        cached: true,
        ...(JSON.parse(cached) as Record<string, unknown>),
      };
    }

    const promptTokens = prompt.split(' ').length;
    const completionTokens = Math.floor(Math.random() * 50) + 10;
    const totalTokens = promptTokens + completionTokens;

    const response = {
      model,
      output: 'This is a mock inference response',
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
      },
    };

    await this.redis.setex(cacheKey, 60, JSON.stringify(response));

    await this.usageRepo.save({
      apiKey,
      model,
      promptTokens,
      completionTokens,
      totalTokens,
      createdAt: new Date(),
    });

    return { cached: false, ...response };
  }
}
