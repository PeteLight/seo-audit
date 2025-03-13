'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  }, [router]);

  const fetchUserProfile = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData = await response.json();
        setUser(profileData.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
        logout();
      }
    },
    [logout]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchUserProfile(storedToken);
    }
  }, [fetchUserProfile]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        alert('Email and password are required.');
        return false;
      }

      if (useMockData) {
        if (email === 'mockuser@example.com' && password === 'test123') {
          const mockUser: User = {
            id: 'mock-id',
            email: 'mockuser@example.com',
            name: 'Mock User',
            role: 'user',
          };
          localStorage.setItem('token', 'mock-token');
          setUser(mockUser);
          return true;
        } else {
          alert('Invalid email or password');
          return false;
        }
      }

      const payload = { email, password };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        alert('Invalid email or password');
        return false;
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      await fetchUserProfile(token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
