'use client';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <div className="flex">
      {user && <Sidebar />}
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
