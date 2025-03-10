'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface Report {
  id: number;
  overallScore: number;
  mobileFriendly: string;
  pageSpeed: string;
  recommendations: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  // State for mock reports
  const [reports, setReports] = useState<Report[]>([]);

  // Form input state for a new SEO audit
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');

  // Local state for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // A mock report to simulate successful API response
  const mockReport: Report = {
    id: 1,
    overallScore: 78,
    mobileFriendly: 'Good',
    pageSpeed: 'Needs Improvement',
    recommendations:
      'Improve image optimization and reduce server response time.',
  };

  // Handle form submission for running a new SEO audit
  const handleAuditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Clear previous messages
    setError('');
    setSuccess('');

    try {
      // Validate that the URL starts with "http" or "https"
      if (!websiteUrl.startsWith('http')) {
        throw new Error(
          'Please enter a valid URL (must start with http or https).'
        );
      }
      // Simulate an API call with a delay (replace with real API call later)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate a successful audit by setting the mock report
      setReports([mockReport]);
      setSuccess('SEO audit has been run successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex-grow p-6">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      {user && (
        <p className="mb-6 text-lg">Welcome, {user.name || user.email}!</p>
      )}

      {/* Button to simulate a report (for quick testing) */}
      <div className="mb-6">
        <button
          onClick={() => setReports([mockReport])}
          className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">
          Simulate Report
        </button>
      </div>

      {reports.length === 0 ? (
        // New Users (No Reports): Show the website details form
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">No Reports Yet</h2>
          <p className="mb-4 text-gray-700">
            It looks like you haven’t analyzed any websites yet. Please provide
            your website details below to start your first SEO audit.
          </p>

          {/* Display error and success messages */}
          {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mb-2 text-sm text-green-600">{success}</p>}

          <form onSubmit={handleAuditSubmit} className="space-y-4">
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
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the full URL of your website (must start with http or
                https).
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
                value={websiteTitle}
                onChange={(e) => setWebsiteTitle(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                This will be used to personalize your SEO audit report.
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
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter keywords you want to focus on for SEO optimization.
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
        // Existing Users (With Reports): Show the latest report overview and navigation cards
        <>
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
