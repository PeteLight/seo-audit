'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';

// Import Sidebar dynamically (client side only)
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex">
      {user && <Sidebar />}
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
