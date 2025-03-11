'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clears the local storage user
    router.push('/'); // Redirect to the landing page
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:underline">
          SEO Audit Pro
        </Link>
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
