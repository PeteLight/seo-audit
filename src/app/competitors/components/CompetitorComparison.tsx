'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

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

interface CompetitorComparisonProps {
  userWebsite: Competitor;
  competitor: Competitor | null;
  onReset: () => void;
}

const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({
  userWebsite,
  competitor,
  onReset,
}) => {
  const comparisonMetrics = [
    { label: 'Search Engine Score', key: 'seoScore', max: 100 },
    { label: 'Trust Score', key: 'domainAuthority', max: 100 },
    { label: 'Website Loading Speed', key: 'pageSpeed', max: 5 }, // Adjusted max for better scaling
    { label: 'Mobile Friendliness', key: 'mobileFriendliness', max: 100 },
    { label: 'Mentions from Other Sites', key: 'backlinks', max: 5000 },
    { label: 'Pages in Google’s Index', key: 'indexedPages', max: 500 },
  ];

  return (
    <div className="bg-white shadow rounded p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {competitor
          ? `Your Site vs. ${competitor.website}`
          : "Your Site's SEO Performance"}
      </h2>

      {!competitor && (
        <p className="text-gray-600 text-center mb-4">
          Click on a competitor from the table below to compare your site
          performance.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisonMetrics.map((metric) => {
          const userValue = Number(userWebsite[metric.key as keyof Competitor]);
          const competitorValue = Number(
            competitor?.[metric.key as keyof Competitor] ?? 0
          ); // ✅ FIX: Ensures competitorValue is never null

          // Scale adjustment for loading speed and other non-100-based metrics
          const scaleMax = metric.max;
          const userPercentage = (userValue / scaleMax) * 100;
          const competitorPercentage = (competitorValue / scaleMax) * 100;

          // Determine colors (Green = Better, Red = Worse)
          const userBetter = competitor ? userValue >= competitorValue : true;
          const userColor = userBetter ? '#4CAF50' : '#FF5733';

          // Chart.js Doughnut Data
          const chartData = (value: number, color: string) => ({
            labels: ['Score', ''],
            datasets: [
              {
                data: [value, 100 - value], // Use percentage for scaling
                backgroundColor: [color, '#E5E7EB'], // Grey for unused portion
                borderWidth: 0, // No border
              },
            ],
          });

          // Chart.js Options
          const chartOptions = {
            rotation: -90, // Rotate to create semi-circle
            circumference: 180, // Only show half
            cutout: '60%', // Controls thickness
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
          };

          return (
            <div
              key={metric.key}
              className="p-4 border rounded shadow bg-gray-100 flex flex-col items-center">
              <h3 className="text-md font-semibold mb-2 text-center">
                {metric.label}
              </h3>

              <div className="flex items-center justify-around w-full flex-wrap">
                {/* User Score - Semi-circle */}
                <div className="w-full md:w-40 flex flex-col items-center">
                  <p className="text-center font-semibold mb-1">Your Site</p>
                  <div className="relative w-full max-w-[150px] h-16">
                    <Doughnut
                      data={chartData(userPercentage, userColor)}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Competitor Score - Semi-circle, only show if competitor is selected */}
                {competitor && (
                  <div className="w-full md:w-40 flex flex-col items-center">
                    <p className="text-center font-semibold mb-1">
                      {competitor.website}
                    </p>
                    <div className="relative w-full max-w-[150px] h-16">
                      <Doughnut
                        data={chartData(
                          competitorPercentage,
                          userBetter ? '#FF5733' : '#4CAF50'
                        )}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {competitor && (
        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Reset Comparison
          </button>
        </div>
      )}
    </div>
  );
};

export default CompetitorComparison;
