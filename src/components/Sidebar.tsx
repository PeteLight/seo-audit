'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserCircleIcon,
  CogIcon,
  UserGroupIcon, // New icon for competitor analysis
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/audits',
      label: 'SEO Audit',
      icon: <DocumentTextIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/reports',
      label: 'Reports',
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/competitors',
      label: 'Competitor Analysis',
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/account',
      label: 'Account',
      icon: <UserCircleIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: <CogIcon className="h-6 w-6" />,
    },
    {
      href: '/logout',
      label: 'Logout',
      icon: <ArrowLeftOnRectangleIcon className="h-6 w-6" />,
    },
  ];

  return (
    <aside
      className={`bg-white shadow-md p-4 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
      <button onClick={toggleSidebar} className="mb-4 focus:outline-none">
        {collapsed ? '>>' : '<<'}
      </button>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 p-2 hover:bg-gray-100 rounded relative">
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
            {/* If collapsed, show label on hover */}
            {collapsed && (
              <span className="absolute left-16 z-10 hidden whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
