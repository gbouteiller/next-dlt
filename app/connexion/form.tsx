'use client';

import {Signin, zSignin} from '@/auth/utils';
import FormInput from '@/components/form/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {signinAction} from './action';

// MAIN ====================================================================================================================================
export default function SigninForm() {
  const {formState, handleSubmit, register, setError} = useForm<Signin>({
    mode: 'onTouched',
    resolver: zodResolver(zSignin),
    defaultValues: {email: '', password: ''},
  });
  const errors = formState.errors;

  const [isPending, startTransition] = useTransition();

  function onSubmit(dto: Signin) {
    startTransition(async () => {
      const {error} = await signinAction(dto);
      setError('root', error);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-1">
      {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
      <FormInput register={register} name="email" label="Courriel" errors={errors} type="email" />
      <FormInput register={register} name="password" label="Mot de passe" errors={errors} type="password" />
      <button type="submit" className="btn btn-primary mt-8">
        {isPending ? <>Connexion en cours...</> : <>Je me connecte</>}
      </button>
    </form>
  );
}
