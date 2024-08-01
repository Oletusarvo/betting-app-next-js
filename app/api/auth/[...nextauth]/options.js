import { User } from 'actions/utils/User';
import db from 'dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, trigger }) {
      return { user: { ...token } };
    },
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      async authorize(credentials) {
        const { email, password } = credentials;
        const [user] = await db('data_users').where({ email });
        if (!user) {
          throw new Error('User does not exist!');
        }

        const ok = await User.verifyCredentials(email, password);
        if (!ok) {
          throw new Error('invalid_password');
        }

        return user;
      },
    }),
  ],
};
