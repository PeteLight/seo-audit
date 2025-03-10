'use client';

import { useState, FormEvent } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Simulate saving settings; in a real app, you'd call an API here
    console.log({ theme, notificationsEnabled, language });
    setMessage('Settings updated successfully!');
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        {/* Notifications Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label
            htmlFor="notifications"
            className="ml-2 block text-sm text-gray-700">
            Enable Notifications
          </label>
        </div>
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add other language options as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
  );
}
