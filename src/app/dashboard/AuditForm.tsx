'use client';

import { useState } from 'react';

interface AuditFormProps {
  onSubmit: (data: {
    websiteURL: string;
    websiteTitle: string;
    targetKeywords: string;
  }) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function AuditForm({
  onSubmit,
  loading,
  error,
}: AuditFormProps) {
  const [websiteURL, setWebsiteURL] = useState('');
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ websiteURL, websiteTitle, targetKeywords });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4">
      <div>
        <label className="block font-semibold mb-1">
          Website URL{' '}
          <span className="text-gray-500 text-sm">
            (include http:// or https://)
          </span>
        </label>
        <input
          type="url"
          className="border border-gray-300 rounded w-full p-2"
          placeholder="https://example.com"
          value={websiteURL}
          onChange={(e) => setWebsiteURL(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">
          Website Title{' '}
          <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2"
          placeholder="Your Website Title"
          value={websiteTitle}
          onChange={(e) => setWebsiteTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">
          Target Keywords{' '}
          <span className="text-gray-500 text-sm">(comma-separated)</span>
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-2"
          placeholder="e.g., local SEO, best pizza near me"
          value={targetKeywords}
          onChange={(e) => setTargetKeywords(e.target.value)}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}>
        {loading ? 'Running Audit...' : 'Run SEO Audit'}
      </button>
    </form>
  );
}
