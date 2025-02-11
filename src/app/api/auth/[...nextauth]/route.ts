import NextAuth from 'next-auth/next';
import { authOptions } from './options';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth(authOptions);
authOptions.providers.push(
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
);
export { handler as GET, handler as POST };