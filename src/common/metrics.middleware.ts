// src/common/middleware/metrics.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Histogram } from 'prom-client';

// Cria o Histogram de tempo de resposta HTTP
export const httpRequestDurationSeconds = new Histogram({
  name: 'http_server_requests_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 3, 5] // Buckets customizados (em segundos)
});

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const start = process.hrtime(); // Pega o tempo de início preciso

    res.on('finish', () => {
      const diff = process.hrtime(start);
      const durationInSeconds = diff[0] + diff[1] / 1e9;

      const route = req.route?.path || req.path || req.url || 'unknown_route';

      httpRequestDurationSeconds.labels(
        req.method,
        route,
        res.statusCode.toString(),
      ).observe(durationInSeconds);
    });

    next();
  }
}
