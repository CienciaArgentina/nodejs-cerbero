import { ResourceHealth } from './ResourceHealth';

export abstract class HealthIndicator {
  abstract name: string;
  status: ResourceHealth = ResourceHealth.Unhealthy;
  details: string | undefined;

  abstract checkHealth(): Promise<void> | void;
}
