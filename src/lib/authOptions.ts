import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // For development/testing: return a mock user if credentials are valid.
        if (credentials?.email && credentials.password === 'test') {
          return {
            id: '1',
            name: 'John Smith',
            email: credentials.email,
            businessName: 'Acme Corp',
            websiteURL: 'https://acme.example.com',
          };
        }
        return null;
      },
    }),
  ],
  //NEXTAUTH_SECRET is defined (set in .env or .env.local)
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.businessName = token.businessName as string | undefined;
        session.user.websiteURL = token.websiteURL as string | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.businessName = user.businessName;
        token.websiteURL = user.websiteURL;
      }
      return token;
    },
  },
};
