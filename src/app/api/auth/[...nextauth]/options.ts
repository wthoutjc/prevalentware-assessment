import { NextAuthOptions } from "next-auth";
import * as bcrypt from "bcryptjs";

// Providers
import Credentials from "next-auth/providers/credentials";

// Auth Actions
import { User } from "@/lib";

// Database
import { db } from "@/database";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@yourmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials!.email },
        });

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.accessToken = (
          user as unknown as { accessToken: string }
        ).accessToken;
        if (account) {
          switch (account.type) {
            case "credentials":
              token.user = (user as unknown as { user: User }).user;
              token.accessTokenExpires = (
                user as unknown as { accessTokenExpires: number }
              ).accessTokenExpires;
              break;
          }
        }
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = (
        token as unknown as { accessToken: string }
      ).accessToken;
      session.user = token.user as any;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
