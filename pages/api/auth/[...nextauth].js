import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectToDatabase, promise } from '../../../util/mongodb';
import { verifyPassword } from '../../../util/auth';

export default NextAuth({
  session: {
    jwt: true,
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        if (!db) throw new Error('Database Connection Failed!');

        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('User not exists!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Invalid Password!');
        }

        let sendingData = {
          ...user,
        };
        delete sendingData.password;

        return { name: sendingData };
      },
    }),
  ],
});
