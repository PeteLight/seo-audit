import React from 'react';

interface Competitor {
  id: number;
  website: string;
  seoScore: number;
  domainAuthority: number;
  pageSpeed: number;
  mobileFriendliness: number;
  organicTraffic: string;
  backlinks: number;
  indexedPages: number;
}

interface CompetitorListProps {
  competitors: Competitor[];
  onSelectCompetitor: (competitor: Competitor) => void;
}

const CompetitorList: React.FC<CompetitorListProps> = ({
  competitors,
  onSelectCompetitor,
}) => {
  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Top Competitors</h2>
      {competitors.length === 0 ? (
        <p className="text-gray-600">No competitors found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Website</th>
              <th className="p-3 text-left">SEO Score</th>
              <th className="p-3 text-left">Domain Authority</th>
              <th className="p-3 text-left">Page Speed</th>
              <th className="p-3 text-left">Mobile Friendliness</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr
                key={competitor.id}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => onSelectCompetitor(competitor)}>
                <td className="p-3 text-blue-500">{competitor.website}</td>
                <td className="p-3 font-bold">{competitor.seoScore}%</td>
                <td className="p-3">{competitor.domainAuthority}</td>
                <td className="p-3">{competitor.pageSpeed}s</td>
                <td className="p-3">{competitor.mobileFriendliness}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompetitorList;
