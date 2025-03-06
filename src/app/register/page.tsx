'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Implement registration logic (API call) once backend is ready
    console.log('Registering with:', { email, password, confirm });
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Register</h1>
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
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </section>
  );
}
