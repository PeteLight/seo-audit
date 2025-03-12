import React from 'react';

interface Recommendation {
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

interface RecommendationsProps {
  recommendations: readonly Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {recommendations.map((item, index) => (
      <div key={index} className="bg-white shadow rounded p-4">
        <div className="font-semibold text-center">{item.title}</div>
        <p className="text-sm text-gray-600 text-center">{item.description}</p>
        <div className="mt-2 text-sm text-center">
          Severity:
          <span
            className={`font-bold ${
              item.severity === 'High'
                ? 'text-red-500'
                : item.severity === 'Medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}>
            {item.severity}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default Recommendations;
