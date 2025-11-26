'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  async function handleFromSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials', { email, password, callbackUrl: '/' });
    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto"
        onSubmit={handleFromSubmit}>
        <input type="email"
          name="email"
          disabled={loginInProgress}
          placeholder="Email"
          value={email}
          onChange={ev => setEmail(ev.target.value)} />
        <input type="password"
          name="password"
          disabled={loginInProgress}
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)} />
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center">
          <Image src={'/google-icon.png'} alt={''} width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center pt-4 my-4 border-t">
          Don&apos;t have an account{' '}
          <Link className="underline" href={'/login'}>Register here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}