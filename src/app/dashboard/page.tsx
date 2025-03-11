'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AuditForm from './AuditForm';
import ReportView from './ReportView';
import { Report } from './types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<Report | null>(null);

  const handleAuditSubmit = async (data: {
    websiteURL: string;
    websiteTitle: string;
    targetKeywords: string;
  }) => {
    if (!/^https?:\/\//.test(data.websiteURL)) {
      setError('Please enter a valid URL (including http:// or https://).');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Simulate an API call delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockReport: Report = {
        overallScore: 75,
        loadTime: 2.3,
        mobileFriendly: true,
        recommendations: [
          {
            title: 'Better Page Titles',
            description: 'Ensure each page has a clear, descriptive title.',
          },
          {
            title: 'Optimize Images',
            description:
              'Compress images and use modern formats to speed up load times.',
          },
          {
            title: 'Minify Code',
            description:
              'Minify your CSS and JavaScript to improve page speed.',
          },
        ],
      };
      setReport(mockReport);
    } catch (e) {
      void e;
      setError('An error occurred while starting the audit.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearReport = () => {
    setReport(null);
  };

  const handleSaveReport = () => {
    alert('Report saved!');
  };

  const handleExportReport = () => {
    alert('Report exported!');
  };

  return (
    <div className="space-y-8">
      {!report ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Welcome, {user?.email || 'Guest'}!
            </h2>
          </div>
          <AuditForm
            onSubmit={handleAuditSubmit}
            loading={loading}
            error={error}
          />
        </>
      ) : (
        <ReportView
          report={report}
          onClear={handleClearReport}
          onSave={handleSaveReport}
          onExport={handleExportReport}
        />
      )}
    </div>
  );
}
