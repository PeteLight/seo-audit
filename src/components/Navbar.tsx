'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
// Using Heroicons v2 (ensure these are installed and imported correctly)
import {
  UserGroupIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SEO Audit Pro
        </Link>
        <div className="flex space-x-4 items-center">
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : session ? (
            // Authenticated state: show Dashboard, Account, Settings, and Logout
            <>
              <Link
                href="/dashboard"
                className="flex items-center text-blue-600 hover:underline">
                <UserGroupIcon className="h-5 w-5 mr-1" /> Dashboard
              </Link>
              <Link
                href="/account"
                className="flex items-center text-blue-600 hover:underline">
                <Cog8ToothIcon className="h-5 w-5 mr-1" /> Account
              </Link>
              <Link
                href="/settings"
                className="flex items-center text-blue-600 hover:underline">
                <Cog8ToothIcon className="h-5 w-5 mr-1" /> Settings
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center text-blue-600 hover:underline">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
              </button>
            </>
          ) : (
            // Unauthenticated state: show Login and Register
            <>
              <Link
                href="/login"
                className="flex items-center text-blue-600 hover:underline">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" /> Login
              </Link>
              <Link
                href="/register"
                className="flex items-center text-blue-600 hover:underline">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
