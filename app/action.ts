'use server';

import {signout} from '@/auth';
import {auth} from '@/auth/lucia';
import * as context from 'next/headers';
import {redirect} from 'next/navigation';

export async function signoutAction() {
  const authRequest = auth.handleRequest('post', context);
  const session = await authRequest.validate();
  await signout(session);  
  authRequest.setSession(null);
  return redirect('/connexion');
}
