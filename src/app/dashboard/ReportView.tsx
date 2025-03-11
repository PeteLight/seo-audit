'use client';

import { Report } from './types';
import OverallScoreCard from './OverallScoreCard';
import LoadTimeCard from './LoadTimeCard';
import MobileCompatibilityCard from './MobileCompatibilityCard';
import RecommendationList from './RecommendationList';

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
        <OverallScoreCard overallScore={report.overallScore} />
        <LoadTimeCard loadTime={report.loadTime} />
        <MobileCompatibilityCard mobileFriendly={report.mobileFriendly} />
        <RecommendationList recommendations={report.recommendations} />
      </div>
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
