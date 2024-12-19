import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('test'),
      z.literal('production')
    ])
    .default('development'),
  PORT: z.coerce.number().min(1000).default(3000),
  LOGS_DIR: z.string().default('./logs'),
  MONGODB_URI: z.string().default('mongodb://mongo:27017/test')
});

export default envSchema.parse(process.env);
