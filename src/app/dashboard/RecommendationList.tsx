'use client';

import RecommendationItem from './RecommendationItem';

interface Recommendation {
  title: string;
  description: string;
}

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export default function RecommendationList({
  recommendations,
}: RecommendationListProps) {
  return (
    <div className="border border-gray-200 rounded p-4">
      <h4 className="font-bold text-lg">How to Improve</h4>
      <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
        {recommendations.map((rec, idx) => (
          <RecommendationItem
            key={idx}
            title={rec.title}
            description={rec.description}
          />
        ))}
      </ul>
    </div>
  );
}
