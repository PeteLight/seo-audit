'use client'; // Required for stateful and interactive components

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ReportList from './components/ReportsList';
import ReportFilters from './components/ReportsFilters';
import { mockReports } from './data/mockReportData';

const ReportsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);

  // Handle search and filter logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockReports.filter((report) =>
      report.website.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">SEO Audit Reports</h1>

        {/* Filters and Search Bar */}
        <ReportFilters searchQuery={searchQuery} onSearch={handleSearch} />

        {/* Report List */}
        <ReportList reports={filteredReports} />
      </div>
    </div>
  );
};

export default ReportsPage;
