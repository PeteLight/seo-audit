'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface User {
  id: string; // Unique identifier for the user
  email: string; // User's email address
  name?: string; // User's display name (optional)
  businessName: string; // Name of the business the user represents
  websiteURL: string; // Primary website for the business
  location: string; // Business location (city, state, country, etc.)
  businessType: string; // Type of business (e.g., Sole Trader, LLC)
  role?: 'user' | 'admin'; // Optional role property for access levels
  registrationDate?: string; // ISO date string for when the user registered
  subscriptionPlan?: string; // E.g., Free, Pro, Enterprise (if applicable)
  preferences?: {
    // Optional preferences object for settings
    theme?: 'light' | 'dark';
    language?: string;
    notificationsEnabled?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    // Optionally store user data to localStorage or cookies here
    setUser(userData);
  };

  const logout = () => {
    // Clear any persisted user data if stored
    // For example: localStorage.removeItem('user');
    setUser(null);
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
