'use client';

import {Signup, zSignup} from '@/auth/utils';
import FormInput from '@/components/form/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {signupAction} from './action';

// MAIN ====================================================================================================================================
export default function SignupForm() {
  const {formState, handleSubmit, register, setError} = useForm<Signup>({
    mode: 'onTouched',
    resolver: zodResolver(zSignup),
    defaultValues: {avatar: '', email: '', forename: '', password: '', surname: ''},
  });
  const errors = formState.errors;

  const [isPending, startTransition] = useTransition();

  function onSubmit(dto: Signup) {
    startTransition(async () => {
      const {error} = await signupAction(dto);
      setError('root', error);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-1">
       {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
      <FormInput register={register} name="forename" label="Prénom" errors={errors} />
      <FormInput register={register} name="surname" label="Nom" errors={errors} />
      <FormInput register={register} name="avatar" label="Avatar" errors={errors} type="url" />
      <FormInput register={register} name="email" label="Courriel" errors={errors} type="email" />
      <FormInput register={register} name="password" label="Mot de passe" errors={errors} type="password" />
      <button type="submit" className="btn btn-primary mt-8">
        {isPending ? <>Inscription en cours...</> : <>Je m&apos;inscris</>}
      </button>
    </form>
  );
}
