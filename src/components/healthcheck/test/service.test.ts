import { MockIndicator } from './mocks/MockIndicator';
import { MockToggleIndicator } from './mocks/mock-toggle-indicator';
import { ResourceHealth } from '../ResourceHealth';
import { getHealth } from '../service';

describe('Health Checks', () => {
  describe('Health Service', () => {
    it('should evaluate health - healthy', async () => {
      const result = await getHealth([new MockIndicator()]);

      expect(result.status).toEqual(ResourceHealth.Healthy);
      expect(result.dependencies[0].status).toEqual(ResourceHealth.Healthy);
      expect(result.dependencies[0].details).not.toBeDefined();
    });

    it('should evaluate health - unhealthy', async () => {
      const result = await getHealth([new MockIndicator(ResourceHealth.Unhealthy)]);

      expect(result.status).toEqual(ResourceHealth.Unhealthy);
      expect(result.dependencies[0].status).toEqual(ResourceHealth.Unhealthy);
    });

    // it('should evaluate unhealthy if mixed health dependencies', async () => {
    //   const services = [new MockIndicator(), new MockIndicator(ResourceHealth.Unhealthy)];

    //   const result = await getHealth(services);

    //   expect(result.status).toEqual(ResourceHealth.Unhealthy);
    //   expect(result.dependencies.filter((dependencies) => result.status === ResourceHealth.Healthy).length).toBe(1);
    //   expect(result.dependencies.filter((dependencies) => result.status === ResourceHealth.Unhealthy).length).toBe(1);
    // });

    it('should be able to return to healthy after being unhealthy', async () => {
      let result = await getHealth([new MockToggleIndicator()]);
      expect(result.status).toEqual(ResourceHealth.Unhealthy);

      result = await getHealth([new MockIndicator()]);
      expect(result.status).toEqual(ResourceHealth.Healthy);
    });

    it('should return details when unhealthy', async () => {
      const unhealthyDetails = 'Unable to communicate to DB';

      const result = await getHealth([new MockIndicator(ResourceHealth.Unhealthy, unhealthyDetails)]);
      expect(result.status).toEqual(ResourceHealth.Unhealthy);
      expect(result.dependencies[0].details).toEqual(unhealthyDetails);
    });
  });
});
