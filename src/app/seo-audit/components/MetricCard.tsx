import React from 'react';

interface MetricCardProps {
  title: string;
  score: number;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  score,
  description,
}) => (
  <div className="bg-white shadow rounded p-4 flex flex-col justify-between">
    <div>
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-3xl font-bold my-2">{score}%</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <button className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
      View details
    </button>
  </div>
);

export default MetricCard;
