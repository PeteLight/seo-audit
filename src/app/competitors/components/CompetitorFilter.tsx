import React from 'react';

interface CompetitorFiltersProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const CompetitorFilters: React.FC<CompetitorFiltersProps> = ({
  searchQuery,
  onSearch,
}) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <input
        type="text"
        placeholder="Search competitors..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default CompetitorFilters;
