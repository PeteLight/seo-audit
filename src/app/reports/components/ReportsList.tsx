'use client'; // Required for interactive components

import React from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

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
  const router = useRouter();

  // Function to export report as PDF
  const handleExport = (report: Report) => {
    const doc = new jsPDF();
    doc.text(`SEO Audit Report for ${report.website}`, 10, 10);
    doc.text(`SEO Score: ${report.seoScore}%`, 10, 20);
    doc.text(`Date: ${report.date}`, 10, 30);
    doc.save(`${report.website}-SEO-Report.pdf`);
  };

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
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td
                  className="p-3 text-blue-500 cursor-pointer hover:underline"
                  onClick={() => router.push(`/reports/${report.id}`)}>
                  {report.website}
                </td>
                <td className="p-3 font-bold">{report.seoScore}%</td>
                <td className="p-3">{report.date}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleExport(report)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Export PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportList;
