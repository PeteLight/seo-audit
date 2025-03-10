'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');

  // On mount, set form values from user context
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setBusinessName(user.name || '');
      // In a real scenario, you'd fetch additional business info (websiteURL, location, businessType)
      // For now, they remain empty until the user enters data
    }
  }, [user]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Simulate saving changes:
    // In a real app, you'll call an API to update the user profile and persist changes.
    // Here, we update the user in our context (using businessName as the user's name for demonstration)
    login({ email, name: businessName });
    setMessage('Profile updated successfully!');
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="mb-6 text-2xl font-bold">Account Details</h1>
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field (read-only) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className="mt-1 w-full rounded border border-gray-300 p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        {/* Business Name Field */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Your Business Name"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Website URL Field */}
        <div>
          <label
            htmlFor="websiteURL"
            className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            id="websiteURL"
            type="url"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            placeholder="https://yourbusiness.com"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Business Type Field */}
        <div>
          <label
            htmlFor="businessType"
            className="block text-sm font-medium text-gray-700">
            Business Type
          </label>
          <input
            id="businessType"
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="e.g., Sole Trader, LLC"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}
