'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const { login } = useAuth();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate registration and login
    // For now, we use businessName as the user's name in our context
    login({ email, name: businessName });
    console.log('Registered with:', {
      email,
      password,
      businessName,
      websiteURL,
      location,
      businessType,
    });
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        {/* Business Name Field */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Your Business Name"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        {/* Website URL Field */}
        <div>
          <label
            htmlFor="websiteURL"
            className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            id="websiteURL"
            type="url"
            placeholder="https://yourbusiness.com"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
          />
        </div>
        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="City, State"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* Business Type Field */}
        <div>
          <label
            htmlFor="businessType"
            className="block text-sm font-medium text-gray-700">
            Business Type
          </label>
          <input
            id="businessType"
            type="text"
            placeholder="e.g., Sole Trader, LLC"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>
        {/* Submit Button */}
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
