import type {Config} from 'drizzle-kit';
import {env} from './app/env';

export default {
  schema: './db/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: env.NODE_ENV === 'production' ? env.TURSO_URL : 'file:./local.db',
    authToken: env.NODE_ENV === 'production' ? env.TURSO_AUTH_TOKEN : '',
  },
  strict: true,
  verbose: true,
} satisfies Config;
