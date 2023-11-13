'use server';

import {signin, superValidate} from '@/auth';
import {auth} from '@/auth/lucia';
import {Signin, zSignin} from '@/auth/utils';
import * as context from 'next/headers';
import {redirect} from 'next/navigation';

export async function signinAction(dto: Signin) {
  const rParsed = await superValidate(dto, zSignin);
  if (!rParsed.success) return rParsed;
  const rSignin = await signin(rParsed.data);
  if (!rSignin.success) return rSignin;
  const authRequest = auth.handleRequest('post', context);
  authRequest.setSession(rSignin.data);
  return redirect('/');
}
