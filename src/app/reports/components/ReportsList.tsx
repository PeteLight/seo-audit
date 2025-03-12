import React from 'react';

interface Report {
  id: number;
  website: string;
  seoScore: number;
  date: string;
}

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Past Reports</h2>
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Website</th>
              <th className="p-3 text-left">SEO Score</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-3">{report.website}</td>
                <td className="p-3 font-bold">{report.seoScore}%</td>
                <td className="p-3">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportList;
