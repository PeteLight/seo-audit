'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Clear the user state
    logout();
    // Redirect to landing page (or '/login' if preferred)
    router.push('/');
  };

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
            <button
              onClick={handleLogout}
              className="hover:text-blue-500 focus:outline-none">
              Logout
            </button>
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
