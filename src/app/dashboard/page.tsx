'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

interface Report {
  id: number;
  overallScore: number;
  mobileFriendly: string;
  pageSpeed: string;
  recommendations: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  // Define a mock report for testing
  const mockReport: Report = {
    id: 1,
    overallScore: 78,
    mobileFriendly: 'Good',
    pageSpeed: 'Needs Improvement',
    recommendations:
      'Improve image optimization and reduce server response time.',
  };

  return (
    <div className="flex-grow p-6">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      {user && (
        <p className="mb-4 text-lg">Welcome, {user.name || user.email}!</p>
      )}

      {/* Button to simulate report data */}
      <div className="mb-6">
        <button
          onClick={() => setReports([mockReport])}
          className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">
          Simulate Report
        </button>
      </div>

      {reports.length === 0 ? (
        // New users (no reports) view
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">No Reports Yet</h2>
          <p className="mb-4 text-gray-700">
            It looks like you haven’t analyzed any websites yet.
          </p>
          <p className="mb-4 text-gray-700">
            Please provide your website details below to start your first SEO
            audit.
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com"
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the full URL of your website.
              </p>
            </div>
            <div>
              <label
                htmlFor="websiteTitle"
                className="block text-sm font-medium text-gray-700">
                Website Title
              </label>
              <input
                id="websiteTitle"
                type="text"
                placeholder="Your Website Title"
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                This will be used to personalize your report.
              </p>
            </div>
            <div>
              <label
                htmlFor="targetKeywords"
                className="block text-sm font-medium text-gray-700">
                Target Keywords
              </label>
              <input
                id="targetKeywords"
                type="text"
                placeholder="e.g., local SEO, best pizza near me"
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide keywords you want to focus on for SEO.
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
              Run SEO Audit
            </button>
          </form>
        </section>
      ) : (
        // Existing users (with reports) view
        <>
          {/* Latest Report Overview at the Top */}
          <section className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">Latest Report Overview</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Overall Score:</span>
                <span className="text-gray-700">
                  {reports[0].overallScore}/100
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Mobile-Friendliness:</span>
                <span className="text-gray-700">
                  {reports[0].mobileFriendly}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Page Speed:</span>
                <span className="text-gray-700">{reports[0].pageSpeed}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="mr-2 font-semibold">Recommendations:</span>
              <span className="text-gray-700">
                {reports[0].recommendations}
              </span>
            </div>
          </section>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/dashboard/audits"
              className="block rounded-lg bg-white p-4 shadow hover:shadow-lg">
              <h2 className="mb-2 text-lg font-bold">Run a New SEO Audit</h2>
              <p>Enter a website URL to generate a new report.</p>
            </Link>
            <Link
              href="/dashboard/reports"
              className="block rounded-lg bg-white p-4 shadow hover:shadow-lg">
              <h2 className="mb-2 text-lg font-bold">View Past Reports</h2>
              <p>Review previous audits and download reports.</p>
            </Link>
            <Link
              href="/dashboard/competitors"
              className="block rounded-lg bg-white p-4 shadow hover:shadow-lg">
              <h2 className="mb-2 text-lg font-bold">Competitor Analysis</h2>
              <p>Compare your websites performance with local competitors.</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
