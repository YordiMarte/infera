import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    health() {
    return {
        status: 'ok',
        service: 'infera-gateway',
        timestamp: new Date().toISOString(),
    };
    }
}
