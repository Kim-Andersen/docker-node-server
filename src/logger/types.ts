import type winston from 'winston';

export type Logger = Pick<winston.Logger, 'info' | 'warn' | 'error'>;
