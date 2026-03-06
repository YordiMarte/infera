import { Body, Controller, Headers, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usage } from '../database/usage.entity';

@Controller('inference')
export class InferenceController {
  constructor(
    @InjectRepository(Usage)
    private readonly usageRepo: Repository<Usage>,
  ) {}

  @Post()
  async infer(
    @Headers('x-api-key') apiKey: string,
    @Body() body: { prompt: string; model: string },
  ) {
    const promptTokens = body.prompt.split(' ').length;
    const completionTokens = Math.floor(Math.random() * 50) + 10;
    const totalTokens = promptTokens + completionTokens;

    await this.usageRepo.save({
      apiKey,
      model: body.model,
      promptTokens,
      completionTokens,
      totalTokens,
      createdAt: new Date(),
    });

    return {
      model: body.model,
      output: 'This is a mock inference response',
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
      },
    };
  }
}
