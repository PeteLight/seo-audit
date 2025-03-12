'use client';

import { useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState('');

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/settings', { emailNotifications, theme });
      setMessage('Settings updated successfully.');
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Failed to update settings.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">User Settings</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSettingsUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Notifications
            </label>
            <select
              value={emailNotifications ? 'enabled' : 'disabled'}
              onChange={(e) =>
                setEmailNotifications(e.target.value === 'enabled')
              }
              className="mt-1 p-2 border border-gray-300 rounded w-full">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Theme Preference
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
