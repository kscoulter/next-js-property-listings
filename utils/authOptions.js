import connectDB from '@/config/database';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // connect to the database
      await connectDB()
      // check if user exists
      const userExists = await User.findOne({ email: profile.email })
      // if not, create user
      if(!userExists) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }
      // return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // Get user from db
      const user = await User.findOne({email: session.user.email});
      // Assign user id from the session
      session.user.id = user._id.toString();
      // return session
      return session;
    }
  }
}