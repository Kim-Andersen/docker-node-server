import { resolve } from 'node:path';
import winston from 'winston';
import env from '../config/env';
import type { Logger } from './types';

const filename = resolve(env.LOGS_DIR, `${env.ENV}.log`);
const timestampFormat = 'DD-MM-YYYY HH:mm:ss:SSS';

const transports: winston.transport[] = [
  new winston.transports.File({ filename }),
];
if (env.ENV === 'development') {
  transports.push(new winston.transports.Console());
}

const { combine, timestamp, printf } = winston.format;
const logger = winston.createLogger({
  level: 'info',
  transports,
  format: combine(
    timestamp({ format: timestampFormat }),
    printf(({ level, message, timestamp, ...metadata }) => {
      return `${timestamp} ${level}: ${message} ${Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : ''}`;
    }),
  ),
});

// eslint-disable-next-line no-console
logger.on('error', (error) => console.error('Winston logger error:', error));

export const end = async () =>
  new Promise<void>((resolve) => {
    logger.once('finish', () => {
      // eslint-disable-next-line no-console
      console.log('All winston log messages has now been logged');
      resolve();
    });

    logger.end();
  });

export default <Logger>logger;
