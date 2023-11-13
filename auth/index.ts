const {LibsqlError} = require('@libsql/client');
import {LuciaError, Session} from 'lucia';
import {ZodType} from 'zod';
import {auth} from './lucia';
import {Signin, Signup} from './utils';

export async function signin({email, password}: Signin) {
  try {
    const {userId} = await auth.useKey('email', email, password);
    const session = await auth.createSession({userId, attributes: {}});
    return {success: true as const, data: session};
  } catch (error_) {
    if (error_ instanceof LuciaError && (error_.message === 'AUTH_INVALID_KEY_ID' || error_.message === 'AUTH_INVALID_PASSWORD'))
      return {success: false as const, error: {message: 'Les identifiants sont invalides.', status: 401 as const}};
    console.error(error_);
    return {success: false as const, error: {message: 'Erreur inconnue! Veuillez réessayer ultérieurement.', status: 500 as const}};
  }
}

export async function signout(session: Session | null) {
  if (session) await auth.invalidateSession(session.sessionId);
}

export async function signup({avatar, email, forename, password, surname}: Signup) {
  try {
    const {userId} = await auth.createUser({
      key: {providerId: 'email', providerUserId: email, password},
      attributes: {avatar, email, forename, surname},
    });
    const session = await auth.createSession({userId, attributes: {}});
    return {success: true as const, data: session};
  } catch (error_) {
    if (error_ instanceof LibsqlError && error_.code === 'SQLITE_CONSTRAINT_UNIQUE')
      return {success: false as const, error: {message: 'Vous possédez déjà un compte. Veuillez vous connecter', status: 400 as const}};
    console.error(error_);
    return {success: false as const, error: {message: 'Erreur inconnue! Veuillez réessayer ultérieurement.', status: 500 as const}};
  }
}

export async function superValidate<D extends Record<string, unknown>>(dto: unknown, schema: ZodType<D>): Promise<Res<D, Err>> {
  try {
    const rParsed = schema.safeParse(dto);
    return rParsed.success ? rParsed : {success: false as const, error: {message: 'Le formulaire est invalide.', status: 400}};
  } catch (error) {
    console.error(error);
    return {success: false as const, error: {message: 'Erreur de récupération des données.', status: 400}};
  }
}

// TYPES ===================================================================================================================================
export type Res<D, E> = {success: true; data: D} | {success: false; error: E};
export type Err = {message: string; status: 400 | 500};
