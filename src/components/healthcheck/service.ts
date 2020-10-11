import { HealthIndicator } from './HealthIndicator';
import { HealthCheck, HealthCheckResult } from './HealthCheck';

export const getHealth = async (servicesCheck: HealthIndicator[]): Promise<HealthCheckResult> => {
  const healthService = new HealthCheck(servicesCheck);

  return await healthService.getHealth();
};
