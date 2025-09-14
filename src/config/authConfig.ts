import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      session.user = {
        email: token.email,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const admin = {
          id: crypto.randomUUID(),
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        };
        if (!user.email || user.email !== admin.email) {
          throw new Error('Email de acesso está incorreto');
        }
        if (!user.password || user.password !== admin.password) {
          throw new Error('Senha de acesso está incorreta');
        }

        return admin;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5, // 5 dias
  },
  // pages: {
  //   signIn: '/admin/login',
  // },
  secret: process.env.NEXTAUTH_SECRET,
};
export default authOptions;
