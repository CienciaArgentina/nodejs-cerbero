import { HealthIndicator } from './HealthIndicator';
import { ResourceHealth } from './ResourceHealth';

export class HealthCheck {
  private readonly checks: HealthIndicator[];
  public overallHealth: ResourceHealth = ResourceHealth.Healthy;

  constructor(checks: HealthIndicator[]) {
    this.checks = checks;
  }

  async getHealth(): Promise<HealthCheckResult> {
    await Promise.all(this.checks.map((check) => check.checkHealth()));

    const anyUnhealthy = this.checks.some((item) => item.status === ResourceHealth.Unhealthy);

    this.overallHealth = anyUnhealthy ? ResourceHealth.Unhealthy : ResourceHealth.Healthy;

    return {
      status: this.overallHealth,
      dependencies: this.checks,
    };
  }
}

export type HealthCheckResult = {
  status: ResourceHealth;
  dependencies: HealthIndicator[];
};
