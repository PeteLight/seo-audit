import React from 'react';

interface AuditScoreCardProps {
  title: string;
  score: number;
  unit?: string; // optional, defaults to "%"
}

const AuditScoreCard: React.FC<AuditScoreCardProps> = ({
  title,
  score,
  unit = '%',
}) => (
  <div className="bg-white shadow rounded p-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex items-center justify-center my-4">
      <div className="text-4xl font-bold">
        {score}
        {unit}
      </div>
    </div>
  </div>
);

export default AuditScoreCard;
