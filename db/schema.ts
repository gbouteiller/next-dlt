import {blob, sqliteTable, text} from 'drizzle-orm/sqlite-core';

// USER ====================================================================================================================================
export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  forename: text('forename').notNull(),
  surname: text('surname').notNull(),
  avatar: text('avatar').notNull(),
});

// SESSION =================================================================================================================================
export const session = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  activeExpires: blob('active_expires', {mode: 'bigint'}).notNull(),
  idleExpires: blob('idle_expires', {mode: 'bigint'}).notNull(),
});

// KEY =====================================================================================================================================
export const key = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password'),
});