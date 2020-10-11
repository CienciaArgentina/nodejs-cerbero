import forwardAuthRoutes from './forward-auth/routes';
import healthRoutes from './healthcheck/routes';

export default [...forwardAuthRoutes, ...healthRoutes];
