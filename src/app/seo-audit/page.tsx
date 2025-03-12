// File: app/seo-audit/page.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AuditScoreCard from './components/AuditScoreCard';
import MetricCard from './components/MetricCard';
import Recommendations from './components/Recommendations';
import { mockSeoAuditData } from './data/mockSeoAuditData';

const SeoAuditPage = () => {
  const {
    overallScore,
    pageLoadTime,
    mobileCompatibility,
    thematicReports,
    recommendations,
  } = mockSeoAuditData;

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar Added */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your SEO Report</h1>

        {/* Recommendations First */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Recommended Improvements
          </h2>
          <Recommendations recommendations={recommendations} />
        </section>

        {/* Overall Score & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AuditScoreCard title="Overall Website Score" score={overallScore} />
          <AuditScoreCard title="Loading Speed" score={pageLoadTime} unit="s" />
          <AuditScoreCard
            title="Mobile Friendliness"
            score={mobileCompatibility}
          />
        </div>

        {/* Grouped Detailed Reports */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Detailed Analysis</h2>
          <div className="space-y-6">
            {/* Technical SEO Group */}
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-3">Technical SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {thematicReports
                  .filter((report) =>
                    [
                      'Crawlability',
                      'HTTPS & Security',
                      'Markup & Structured Data',
                    ].includes(report.title)
                  )
                  .map((report, index) => (
                    <MetricCard
                      key={index}
                      title={report.title}
                      score={report.score}
                      description={report.description}
                    />
                  ))}
              </div>
            </div>

            {/* User Experience & Performance Group */}
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-3">
                User Experience & Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {thematicReports
                  .filter((report) =>
                    [
                      'Core Web Vitals',
                      'Performance & Speed',
                      'Mobile Optimization',
                    ].includes(report.title)
                  )
                  .map((report, index) => (
                    <MetricCard
                      key={index}
                      title={report.title}
                      score={report.score}
                      description={report.description}
                    />
                  ))}
              </div>
            </div>

            {/* On-Page SEO Group */}
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-3">
                On-Page SEO & Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {thematicReports
                  .filter((report) =>
                    ['Meta & On-Page SEO', 'Internal Linking'].includes(
                      report.title
                    )
                  )
                  .map((report, index) => (
                    <MetricCard
                      key={index}
                      title={report.title}
                      score={report.score}
                      description={report.description}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeoAuditPage;
