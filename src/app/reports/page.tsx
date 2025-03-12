'use client';

import { useRef, useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import Sidebar from '@/components/Sidebar';
import { mockReportData } from '@/app/reports/data/mockReportData';

type ReportDataType = (typeof mockReportData)[0]; // Assuming mockReportData is an array

const ReportsPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [selectedReport, setSelectedReport] = useState<ReportDataType | null>(
    null
  );
  const [reports, setReports] = useState<ReportDataType[]>([]);

  useEffect(() => {
    pdfMake.vfs = pdfFonts.vfs;
    setReports(mockReportData); // Load all reports
  }, []);

  const handleExportPDF = (report: ReportDataType) => {
    if (!report) return;

    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: report.title, style: 'header' },
        { text: `Website: ${report.website}`, style: 'subheader' },
        { text: `Date: ${report.date}`, style: 'subheader' },
        { text: `Overall Score: ${report.score}`, style: 'subheader' },
        { text: `Details: ${report.details}`, style: 'content' },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: {
          fontSize: 14,
          margin: [0, 10, 0, 5] as [number, number, number, number],
        },
        content: { fontSize: 12 },
      },
    };

    pdfMake
      .createPdf(documentDefinition)
      .download(`${report.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">SEO Reports</h1>

        {/* Reports Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Report Title
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Website
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Score
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedReport(report)}>
                  <td className="px-4 py-2">{report.title}</td>
                  <td className="px-4 py-2">{report.website}</td>
                  <td className="px-4 py-2">{report.date}</td>
                  <td className="px-4 py-2 font-semibold text-blue-600">
                    {report.score}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportPDF(report);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Report Details Section */}
        {selectedReport && (
          <div
            ref={reportRef}
            className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold">{selectedReport.title}</h2>
            <p className="text-lg font-medium mt-2">
              Website:{' '}
              <span className="text-gray-600">{selectedReport.website}</span>
            </p>
            <p className="text-lg font-medium mt-2">
              Date: <span className="text-gray-600">{selectedReport.date}</span>
            </p>
            <p className="text-lg font-medium mt-2">
              Overall Score:{' '}
              <span className="text-blue-600 font-bold">
                {selectedReport.score}
              </span>
            </p>
            <p className="text-gray-600 mt-2">{selectedReport.details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
