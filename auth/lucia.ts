import {env} from '@/app/env';
import {dbClient} from '@/db';
import {libsql} from '@lucia-auth/adapter-sqlite';
import {lucia} from 'lucia';
import {nextjs_future} from 'lucia/middleware';

export const auth = lucia({
  env: env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: libsql(dbClient, {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: ({avatar, email, forename, surname}) => ({avatar, email, forename, surname}),
});

// TYPES ===================================================================================================================================
export type Auth = typeof auth;
