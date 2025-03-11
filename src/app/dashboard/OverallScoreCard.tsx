'use client';

import CircularProgress from './CircularProgress';

interface OverallScoreCardProps {
  overallScore: number;
}

export default function OverallScoreCard({
  overallScore,
}: OverallScoreCardProps) {
  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col items-center">
      <h4 className="font-bold text-lg mb-2">Website Score</h4>
      <CircularProgress percentage={overallScore} />
      <p className="text-gray-600 text-sm mt-2">
        A score above 80 is great, 60-80 is average, and below 60 means
        improvements are needed.
      </p>
    </div>
  );
}
