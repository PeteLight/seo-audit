// app/page.tsx
'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Boost Your Local SEO Effortlessly
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Simplify your SEO audits, generate actionable reports, and outshine
          your competitors—all in one place.
        </p>
        <Link href="/register">
          <button className="rounded bg-blue-500 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-600">
            Get Started
          </button>
        </Link>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Choose SEO Audit Pro?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <div className="mb-4 h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Comprehensive Audits
            </h3>
            <p className="text-center text-gray-600">
              Quickly scan your website for issues and receive clear, actionable
              insights.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <div className="mb-4 h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Detailed Reports
            </h3>
            <p className="text-center text-gray-600">
              Get reports that break down performance metrics and highlight key
              improvement areas.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <div className="mb-4 h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Competitor Insights
            </h3>
            <p className="text-center text-gray-600">
              Compare your performance with local competitors and identify new
              opportunities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
