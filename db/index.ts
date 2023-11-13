import {env} from '@/app/env';
import {drizzle} from 'drizzle-orm/libsql';
const {createClient} = require('@libsql/client');

export const dbClient = createClient({
  url: env.NODE_ENV === 'development' ? 'file:./local.db' : env.TURSO_URL,
  authToken: env.NODE_ENV === 'development' ? '' : env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(dbClient);
