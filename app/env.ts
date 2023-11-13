import {config} from 'dotenv';
import {z} from 'zod';

config({path: '.env.local'});

const zEnv = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TURSO_AUTH_TOKEN: z.string(),
  TURSO_URL: z.string().url(),
});

export const env = zEnv.parse(process.env);
