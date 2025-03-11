'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// Define the Report interface with a loadTime property and updated recommendations
interface Report {
  overallScore: number;
  loadTime: number; // in seconds
  mobileFriendly: boolean;
  recommendations: { title: string; description: string }[];
}

// A CircularProgress component to display the overall score as a circular graph
function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#d2d3d4"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#4ade80"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="text-xl font-bold fill-current text-blue-600">
        {percentage}%
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [websiteURL, setWebsiteURL] = useState('');
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<Report | null>(null);

  const handleSimulateReport = () => {
    alert('Simulating report... (Mock functionality)');
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic URL validation: ensure URL starts with http:// or https://
    if (!/^https?:\/\//.test(websiteURL)) {
      setError('Please enter a valid URL (including http:// or https://).');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate an API call delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create a mock report with friendly, non-jargon copy
      const mockReport: Report = {
        overallScore: 75,
        loadTime: 2.3,
        mobileFriendly: true,
        recommendations: [
          {
            title: 'Better Page Titles',
            description:
              "Make sure each page has a clear title that tells visitors what it's about.",
          },
          {
            title: 'Optimize Images',
            description:
              'Compress images and use modern formats to help your pages load faster.',
          },
          {
            title: 'Minify Code',
            description:
              'Shorten your CSS and JavaScript files to speed up page loading.',
          },
        ],
      };

      setReport(mockReport);
    } catch (e) {
      void e;
      setError('An error occurred while starting the audit.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearReport = () => {
    setReport(null);
  };

  const handleSaveReport = () => {
    alert('Report saved!');
  };

  const handleExportReport = () => {
    alert('Report exported!');
  };

  return (
    <div className="space-y-8">
      {!report ? (
        <>
          {/* Header with Greeting and Simulate Report Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Welcome, {user?.email || 'Guest'}!
            </h2>
            <button
              onClick={handleSimulateReport}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Simulate Report
            </button>
          </div>

          {/* "No Reports Yet" Section with Audit Form */}
          <div className="bg-white p-6 rounded shadow space-y-6">
            <h3 className="text-xl font-medium">No Reports Yet</h3>
            <p className="text-gray-600">
              You havent analyzed any websites yet. Enter your website details
              below to get started.
            </p>

            {error && <div className="text-red-500">{error}</div>}

            <form onSubmit={handleAuditSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">
                  Website URL{' '}
                  <span className="text-gray-500 text-sm">
                    (include http:// or https://)
                  </span>
                </label>
                <input
                  type="url"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="https://example.com"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Website Title{' '}
                  <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Your Website Title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Target Keywords{' '}
                  <span className="text-gray-500 text-sm">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="e.g., local SEO, best pizza near me"
                  value={targetKeywords}
                  onChange={(e) => setTargetKeywords(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}>
                {loading ? 'Running Audit...' : 'Run SEO Audit'}
              </button>
            </form>
          </div>
        </>
      ) : (
        // Display the mock report in an attractive, easy-to-read format
        <div className="bg-white p-6 rounded shadow space-y-6">
          <h3 className="text-2xl font-semibold">Your Website Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Score Card with Circular Graph */}
            <div className="border border-gray-200 rounded p-4 flex flex-col items-center">
              <h4 className="font-bold text-lg mb-2">Website Score</h4>
              <CircularProgress percentage={report.overallScore} />
              <p className="text-gray-600 text-sm mt-2">
                A score above 80 is excellent, 60-80 is average, and below 60
                needs improvement.
              </p>
            </div>
            {/* Page Load Time Card */}
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-bold text-lg">Page Load Time</h4>
              <p className="text-2xl text-blue-600">{report.loadTime} sec</p>
              <p className="text-gray-600 text-sm mt-2">
                Fast load times enhance user experience. Aim for under 3
                seconds.
              </p>
            </div>
            {/* Mobile Compatibility Card */}
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-bold text-lg">Mobile Compatibility</h4>
              <p className="text-2xl">{report.mobileFriendly ? 'Yes' : 'No'}</p>
              <p className="text-gray-600 text-sm mt-2">
                Yes means your site works well on mobile. No means improvements
                are needed.
              </p>
            </div>
            {/* Recommendations Card */}
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-bold text-lg">How to Improve</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                {report.recommendations.map((rec, idx) => (
                  <li key={idx}>
                    <strong>{rec.title}:</strong> {rec.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveReport}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Report
            </button>
            <button
              onClick={handleExportReport}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Export Report
            </button>
          </div>
          <button
            onClick={handleClearReport}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Run Another Audit
          </button>
        </div>
      )}
    </div>
  );
}
