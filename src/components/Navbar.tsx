'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="text-xl font-semibold">
        <Link href="/">SEO Audit Pro</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">
              Welcome, {user.name || user.email}
            </span>
            <Link href="/dashboard/account" className="hover:text-blue-500">
              Account
            </Link>
            <Link href="/dashboard/settings" className="hover:text-blue-500">
              Settings
            </Link>
            <Link href="/logout" className="hover:text-blue-500">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-500">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-500">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
