import Link from 'next/link';
import Form from './form';
import * as context from 'next/headers';
import {redirect} from 'next/navigation';
import {auth} from '@/auth/lucia';

export default async function SigninPage() {
  const authRequest = auth.handleRequest('GET', context);
  const session = await authRequest.validate();
  if (session) redirect('/');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="card card-bordered bg-neutral text-neutral-content w-full max-w-md shadow-md">
        <div className="card-body items-center text-center">
          <h1 className="card-title">Connexion</h1>
          <Form />
          <Link href="/inscription" className="btn btn-link self-end px-0">
            Je m'inscris
          </Link>
        </div>
      </div>
    </section>
  );
}
