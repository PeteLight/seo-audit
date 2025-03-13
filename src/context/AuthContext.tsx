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
  businessName?: string;
  websiteURL?: string;
  location?: string;
  businessType?: string;
  role?: 'user' | 'admin';
  registrationDate?: string;
  subscriptionPlan?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notificationsEnabled?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Ensure logout is stable
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  }, [router]);

  // Ensure fetchUserProfile is stable and includes logout as a dependency
  const fetchUserProfile = useCallback(
    async (token: string) => {
      try {
        console.log('Fetching user profile with token:', token); // Debugging
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
        console.log('User profile fetched successfully:', profileData); // Debugging
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
      console.log('Stored token found:', storedToken); // Debugging
      fetchUserProfile(storedToken);
    } else {
      console.log('No stored token found.'); // Debugging
    }
  }, [fetchUserProfile]);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email, password }); // Debugging

      if (!email || !password) {
        console.error('Error: Email or Password is missing');
        return;
      }

      const payload = { email, password };
      console.log('Payload being sent:', JSON.stringify(payload)); // Debugging

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Correct payload structure
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const { token } = await response.json();
      console.log('Login successful, token received:', token); // Debugging

      localStorage.setItem('token', token);
      await fetchUserProfile(token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
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
