import { HealthIndicator } from '../HealthIndicator';
import { ResourceHealth } from '../ResourceHealth';
// import { getConnection } from 'typeorm';
import { logger } from 'ciencia-argentina-backend-commons';

export class CienciaArgentinaConnectionCheck extends HealthIndicator {
  name = 'CienciaArgentina connection';

  async checkHealth(): Promise<void> {
    try {
      this.status = ResourceHealth.Healthy;
    } catch (error) {
      logger.error({ error, service: this.name, status: ResourceHealth.Unhealthy });
      this.status = ResourceHealth.Unhealthy;
      this.details = error.message;
    }
  }
}
