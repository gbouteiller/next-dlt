import {auth} from '@/auth/lucia';
import * as context from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import Form from './form';

export default async function SignupPage() {
  const authRequest = auth.handleRequest('GET', context);
  const session = await authRequest.validate();
  if (session) redirect('/');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="card card-bordered bg-neutral text-neutral-content w-full max-w-md shadow-md">
        <div className="card-body items-center text-center">
          <h1 className="card-title">Inscription</h1>
          <Form />
          <Link href="/connexion" className="btn btn-link self-end px-0">
            Je me connecte
          </Link>
        </div>
      </div>
    </section>
  );
}
