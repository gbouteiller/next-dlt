'use client';

import {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {signoutAction} from './action';

// MAIN ====================================================================================================================================
export default function SignoutForm() {
  const {handleSubmit} = useForm();

  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(signoutAction);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-1">
      <button type="submit" className="btn btn-primary mt-8">
        {isPending ? <>Déconnexion en cours...</> : <>Je me déconnecte</>}
      </button>
    </form>
  );
}
