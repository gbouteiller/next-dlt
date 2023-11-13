import {auth} from '@/auth/lucia';
import * as context from 'next/headers';
import Image from 'next/image';
import {redirect} from 'next/navigation';
import Form from './form';

export default async function IndexPage() {
  const authRequest = auth.handleRequest('GET', context);
  const session = await authRequest.validate();
  if (!session) redirect('/connexion');

  const {avatar, forename, surname} = session.user;
  const fullname = `${forename} ${surname.toUpperCase()}`;

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="card card-bordered bg-neutral text-neutral-content w-full max-w-md shadow-md">
        <div className="card-body items-center gap-8 text-center">
          <h1 className="card-title">Bienvenue {fullname}</h1>
          <Image src={avatar} sizes="(min-width: 548px) 448px, calc(100vw - 96px)" alt="Avatar" width={3888} height={5184} />
          <Form />
        </div>
      </div>
    </section>
  );
}
