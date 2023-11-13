'use server';

import {signup, superValidate} from '@/auth';
import {auth} from '@/auth/lucia';
import {Signup, zSignup} from '@/auth/utils';
import * as context from 'next/headers';
import {redirect} from 'next/navigation';

export async function signupAction(dto: Signup) {
  const rParsed = await superValidate(dto, zSignup);
  if (!rParsed.success) return rParsed;
  const rSignup = await signup(rParsed.data);
  if (!rSignup.success) return rSignup;
  const authRequest = auth.handleRequest('post', context);
  authRequest.setSession(rSignup.data);
  return redirect('/');
}
