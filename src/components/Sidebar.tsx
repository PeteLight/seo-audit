'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // SidebarLink component now uses the new Link syntax
  function SidebarLink({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon?: React.ReactNode;
  }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded transition-colors ${
          collapsed ? 'justify-center' : ''
        } ${isActive ? 'bg-gray-300' : ''}`}>
        {icon && <span className="h-5 w-5">{icon}</span>}
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  }

  return (
    <aside
      className={`bg-gray-100 h-screen p-2 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="bg-white mb-4 p-2 rounded hover:bg-gray-200">
        {collapsed ? '>>' : '<<'}
      </button>

      {user ? (
        <>
          <SidebarLink
            href="/dashboard"
            label="Dashboard"
            icon={<HomeIcon />}
          />
          <SidebarLink
            href="/seo-audit"
            label="SEO Audit"
            icon={<DocumentTextIcon />}
          />
          <SidebarLink
            href="/reports"
            label="Reports"
            icon={<DocumentTextIcon />}
          />
          <SidebarLink
            href="/competitors"
            label="Competitor Analysis"
            icon={<DocumentTextIcon />}
          />
          <SidebarLink
            href="/account"
            label="Account"
            icon={<Cog6ToothIcon />}
          />
          <SidebarLink
            href="/settings"
            label="Settings"
            icon={<Cog6ToothIcon />}
          />
          <button
            onClick={handleLogout}
            type="button"
            className={`mt-auto bg-white p-2 rounded hover:bg-gray-200 ${
              collapsed ? 'mx-auto' : ''
            }`}>
            {!collapsed ? 'Logout' : 'X'}
          </button>
        </>
      ) : (
        <>
          <SidebarLink href="/login" label="Login" icon={<HomeIcon />} />
          <SidebarLink href="/register" label="Register" icon={<HomeIcon />} />
        </>
      )}
    </aside>
  );
}
