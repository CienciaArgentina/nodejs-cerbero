import { HealthIndicator } from '../../HealthIndicator';
import { ResourceHealth } from '../../ResourceHealth';

export class MockToggleIndicator extends HealthIndicator {
  name = 'Mock Toggle Indicator';

  constructor(health?: ResourceHealth) {
    super();
    this.status = health || ResourceHealth.Healthy;
  }

  checkHealth(): Promise<void> {
    this.status = this.status === ResourceHealth.Healthy ? ResourceHealth.Unhealthy : ResourceHealth.Healthy;

    return new Promise((resolve) => {
      resolve();
    });
  }
}
