'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Simulate login
    login({ email });
    console.log('Logged in with:', { email, password });

    // Redirect to dashboard
    router.push('/dashboard');
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Log In
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </section>
  );
}
