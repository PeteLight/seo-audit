'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If a user is logged in, redirect them to the dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // If the user is logged in, don't render the landing page content
  if (user) return null;

  return (
    <main className="py-12">
      {/* Hero Section */}
      <section className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome to SEO Audit Pro
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Simplify your SEO audits and boost your local search rankings.
        </p>
        <div className="mt-6">
          <Link
            href="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-16 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            How It Works
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Simple steps to get your SEO audits up and running.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">Sign Up</h3>
              <p className="mt-2 text-gray-600">
                Create your free account and enter basic details about your
                business or website.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                Run Your Audit
              </h3>
              <p className="mt-2 text-gray-600">
                Start a comprehensive SEO audit with a single click—no technical
                knowledge required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                Get Insights
              </h3>
              <p className="mt-2 text-gray-600">
                Receive a detailed report and competitor comparison, complete
                with actionable steps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
