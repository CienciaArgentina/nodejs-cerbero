import { logger, startServer } from 'ciencia-argentina-backend-commons';
import routes from './components';

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.error(e);
  process.exit(1);
});

startServer(+(process.env.HTTP_PORT || 8080), routes);
