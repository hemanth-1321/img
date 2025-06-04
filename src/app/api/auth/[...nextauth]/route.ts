import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { prisma } from "@/lib/config";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }: { user: User; account: any; profile?: any }) {
      console.log("User signed in:", user);
      if (!user.email || !user.image) {
        throw new Error("User email and image are required");
      }

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          avatar: user.image,
        },
        create: {
          name: user.name,
          email: user.email,
          avatar: user.image,
        },
      });

      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};

// Setup route handler for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
