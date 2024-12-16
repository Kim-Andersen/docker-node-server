import app from './app/app';
import env from './config/env';
import mongodb from './config/mongodb.config';
import logger, { end as endLogger } from './logger/logger';

process.on('uncaughtException', async (error) => {
  logger.error(error);
  if (error.cause) {
    logger.error(error.cause);
  }
  process.exit(1);
});

logger.info(`env: ${JSON.stringify(env)}`);
logger.info(`env`, env);
logger.info('Starting server');

await mongodb.connect(env.MONGODB_URI);

const server = app.listen(env.PORT, () =>
  logger.info(`Server is running on port ${env.PORT}`),
);

const shutdown = (() => {
  return async (signal: string) => {
    logger.info(`${signal} shutdown`);

    server.close(async (error) => {
      if (error) {
        logger.error(new Error('Error closing server', { cause: error }));
        process.exitCode = 1;
      } else {
        logger.info('Closed http server');
        process.exitCode = 0;
      }

      await mongodb.disconnect();

      logger.info('Server shutdown complete');

      await endLogger();
    });
  };
})();

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
