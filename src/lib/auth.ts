import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// 환경변수 확인 (개발 모드에서만)
if (process.env.NODE_ENV === 'development') {
  console.log(
    'Google Client ID:',
    process.env.GOOGLE_CLIENT_ID ? 'Set ✓' : 'Missing ✗'
  );
  console.log(
    'Google Client Secret:',
    process.env.GOOGLE_CLIENT_SECRET ? 'Set ✓' : 'Missing ✗'
  );
  console.log('NextAuth URL:', process.env.NEXTAUTH_URL);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
