import { logger,startServer } from 'ciencia-argentina-backend-commons';
import routes from './components';
import { connectDb } from './config/db/db';
import { cienciaArgDb } from './config/db/knexfile';

process.on('uncaughtException', (e) => {
  logger.error({e});
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.error({e});
  process.exit(1);
});

connectDb(cienciaArgDb);
startServer(+(process.env.HTTP_PORT || 8080),routes);
