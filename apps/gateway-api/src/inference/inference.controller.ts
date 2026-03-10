import { Body, Controller, Headers, Post } from '@nestjs/common';
import { InferenceService } from './inference.service';

@Controller('inference')
export class InferenceController {
  constructor(private readonly service: InferenceService) {}

  @Post()
  infer(
    @Headers('x-api-key') apiKey: string,
    @Body() body: { prompt: string; model: string },
  ) {
    return this.service.infer(apiKey, body.prompt, body.model);
  }
}
