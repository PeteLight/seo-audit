// app/dashboard/ReportView.tsx
'use client';

import { Report } from './types';

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
        strokeDasharray={`${circumference} ${circumference}`}
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

interface ReportViewProps {
  report: Report;
  onClear: () => void;
  onSave: () => void;
  onExport: () => void;
}

export default function ReportView({
  report,
  onClear,
  onSave,
  onExport,
}: ReportViewProps) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h3 className="text-2xl font-semibold">Your Website Report</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Card with Circular Graph */}
        <div className="border border-gray-200 rounded p-4 flex flex-col items-center">
          <h4 className="font-bold text-lg mb-2">Website Score</h4>
          <CircularProgress percentage={report.overallScore} />
          <p className="text-gray-600 text-sm mt-2">
            A score above 80 is great, 60-80 is average, and below 60 means
            improvements are needed.
          </p>
        </div>
        {/* Page Load Time Card */}
        <div className="border border-gray-200 rounded p-4">
          <h4 className="font-bold text-lg">Page Load Time</h4>
          <p className="text-2xl text-blue-600">{report.loadTime} sec</p>
          <p className="text-gray-600 text-sm mt-2">
            Fast load times improve user experience. Aim for under 3 seconds.
          </p>
        </div>
        {/* Mobile Compatibility Card */}
        <div className="border border-gray-200 rounded p-4">
          <h4 className="font-bold text-lg">Mobile Compatibility</h4>
          <p className="text-2xl">{report.mobileFriendly ? 'Yes' : 'No'}</p>
          <p className="text-gray-600 text-sm mt-2">
            Yes means your site works well on mobile devices; No indicates
            improvements are needed.
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
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Report
        </button>
        <button
          onClick={onExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Export Report
        </button>
      </div>
      <button
        onClick={onClear}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
        Run Another Audit
      </button>
    </div>
  );
}
