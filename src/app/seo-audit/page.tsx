'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AuditScoreCard from './components/AuditScoreCard';
import Recommendations from './components/Recommendations';
import { mockSeoAuditData } from './data/mockSeoAuditData';

const SeoAuditPage: React.FC = () => {
  const {
    overallScore,
    pageLoadTime,
    mobileCompatibility,
    thematicReports,
    recommendations,
  } = mockSeoAuditData;

  // Accordion state management
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your SEO Report</h1>

        {/* Recommended Improvements */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Recommended Improvements
          </h2>
          <Recommendations recommendations={recommendations} />
        </section>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AuditScoreCard title="Overall Website Score" score={overallScore} />
          <AuditScoreCard title="Loading Speed" score={pageLoadTime} unit="s" />
          <AuditScoreCard
            title="Mobile Friendliness"
            score={mobileCompatibility}
          />
        </div>

        {/* Detailed Analysis with Expandable Sections */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Detailed Analysis</h2>
          <div className="space-y-4">
            {/* Technical SEO */}
            <div className="bg-white shadow rounded p-4">
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection('technicalSeo')}>
                <h3 className="text-lg font-semibold">Technical SEO</h3>
                <span>{expandedSections['technicalSeo'] ? '▼' : '▶'}</span>
              </div>
              {expandedSections['technicalSeo'] && (
                <div className="mt-4">
                  {thematicReports
                    .filter((report) =>
                      [
                        'Crawlability',
                        'HTTPS & Security',
                        'Markup & Structured Data',
                      ].includes(report.title)
                    )
                    .map((report, index) => (
                      <p key={index} className="text-sm text-gray-700 mb-2">
                        <strong>{report.title}:</strong> {report.description}{' '}
                        (Score: {report.score}%)
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* User Experience & Performance */}
            <div className="bg-white shadow rounded p-4">
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection('uxPerformance')}>
                <h3 className="text-lg font-semibold">
                  User Experience & Performance
                </h3>
                <span>{expandedSections['uxPerformance'] ? '▼' : '▶'}</span>
              </div>
              {expandedSections['uxPerformance'] && (
                <div className="mt-4">
                  {thematicReports
                    .filter((report) =>
                      [
                        'Core Web Vitals',
                        'Performance & Speed',
                        'Mobile Optimization',
                      ].includes(report.title)
                    )
                    .map((report, index) => (
                      <p key={index} className="text-sm text-gray-700 mb-2">
                        <strong>{report.title}:</strong> {report.description}{' '}
                        (Score: {report.score}%)
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* On-Page SEO */}
            <div className="bg-white shadow rounded p-4">
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection('onPageSeo')}>
                <h3 className="text-lg font-semibold">On-Page SEO & Content</h3>
                <span>{expandedSections['onPageSeo'] ? '▼' : '▶'}</span>
              </div>
              {expandedSections['onPageSeo'] && (
                <div className="mt-4">
                  {thematicReports
                    .filter((report) =>
                      ['Meta & On-Page SEO', 'Internal Linking'].includes(
                        report.title
                      )
                    )
                    .map((report, index) => (
                      <p key={index} className="text-sm text-gray-700 mb-2">
                        <strong>{report.title}:</strong> {report.description}{' '}
                        (Score: {report.score}%)
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeoAuditPage;
