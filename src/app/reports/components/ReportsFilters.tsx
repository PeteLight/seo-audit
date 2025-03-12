import React from 'react';

interface ReportFiltersProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchQuery,
  onSearch,
}) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <input
        type="text"
        placeholder="Search by website..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default ReportFilters;
