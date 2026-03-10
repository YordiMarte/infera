import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
    inferenceCouter = new client.Counter({
    name: 'inference_requests_total',
    help: 'Total inference requests',
});

    cacheHitCounter = new client.Counter({
        name: 'infera_cache_hits_total',
        help: 'Cache hit count',
    });
}
