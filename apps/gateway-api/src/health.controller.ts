import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  health(): {
    status: string;
    service: string;
    timestamp: string;
  } {
    return {
      status: 'ok',
      service: 'infera-gateway',
      timestamp: new Date().toISOString(),
    };
  }
}
