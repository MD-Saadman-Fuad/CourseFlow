import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  debug: true,
  // Optional: customize JWT/session
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) token.user = user;
        return token;
      } catch (e) {
        console.error('NextAuth jwt callback error:', e);
        throw e;
      }
    },
    async session({ session, token }) {
      try {
        session.user = token.user;
        return session;
      } catch (e) {
        console.error('NextAuth session callback error:', e);
        throw e;
      }
    },
  }
};

// Log configured client IDs (do not log secrets). Useful to verify env values at startup.
try {
  console.info('NextAuth configured GOOGLE_CLIENT_ID=', process.env.GOOGLE_CLIENT_ID);
  console.info('NextAuth configured GITHUB_CLIENT_ID=', process.env.GITHUB_CLIENT_ID);
  console.info('NextAUTH_URL=', process.env.NEXTAUTH_URL);
} catch (e) {
  // ignore
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
