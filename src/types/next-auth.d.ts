import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      businessName?: string;
      websiteURL?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    businessName?: string;
    websiteURL?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    businessName?: string;
    websiteURL?: string;
  }
}
