'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';

interface CombinedAuthProviderProps {
  children: React.ReactNode;
}

export default function CombinedAuthProvider({
  children,
}: CombinedAuthProviderProps) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
