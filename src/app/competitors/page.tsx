'use client'; // Required for interactivity

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CompetitorList from './components/CompetitorList';
import CompetitorComparison from './components/CompetitorComparison';
import CompetitorFilters from './components/CompetitorFilter';
import { mockCompetitorData } from './data/mockCompetitorData';

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

const userWebsite: Competitor = {
  id: 0, // Identifies user's site
  website: 'your-site.com',
  seoScore: 85,
  domainAuthority: 45,
  pageSpeed: 1.8,
  mobileFriendliness: 90,
  organicTraffic: '50K visits',
  backlinks: 1200,
  indexedPages: 120,
};

const CompetitorAnalysisPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompetitors, setFilteredCompetitors] =
    useState(mockCompetitorData);
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredCompetitors(
      mockCompetitorData.filter((competitor) =>
        competitor.website.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Competitor Analysis</h1>

        {/* Filters */}
        <CompetitorFilters searchQuery={searchQuery} onSearch={handleSearch} />

        {/* Dynamic Competitor Comparison Above Table */}
        <CompetitorComparison
          userWebsite={userWebsite}
          competitor={selectedCompetitor}
          onReset={() => setSelectedCompetitor(null)}
        />

        {/* Competitor List */}
        <CompetitorList
          competitors={filteredCompetitors}
          onSelectCompetitor={setSelectedCompetitor}
        />
      </div>
    </div>
  );
};

export default CompetitorAnalysisPage;
