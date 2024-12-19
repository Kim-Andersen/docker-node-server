import { beforeEach, describe, expect, test } from 'vitest';
import { envSchema } from './env';

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  test('should validate development environment', () => {
    const config = envSchema.parse({
      NODE_ENV: 'development',
      PORT: '3000',
      MONGODB_URI: 'mongodb://localhost:27017/test'
    });

    expect(config).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      LOGS_DIR: './logs',
      MONGODB_URI: 'mongodb://localhost:27017/test'
    });
  });

  test('should use default values when env vars are missing', () => {
    expect(envSchema.parse({})).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      LOGS_DIR: './logs',
      MONGODB_URI: 'mongodb://mongo:27017/test'
    });
  });

  test('should throw error for invalid NODE_ENV', () => {
    expect(() => envSchema.parse({ NODE_ENV: 'invalid' })).toThrow();
  });

  test('should throw error for invalid PORT', () => {
    expect(() => envSchema.parse({ PORT: '999' })).toThrow();
  });

  test('should coerce PORT string to number', () => {
    const config = envSchema.parse({ PORT: '4000' });
    expect(config.PORT).toBe(4000);
  });
});
