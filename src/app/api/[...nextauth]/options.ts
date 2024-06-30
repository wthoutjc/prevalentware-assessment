import { NextAuthOptions } from "next-auth";

// Providers
import Credentials from "next-auth/providers/credentials";

// Auth Actions
import { signInAction } from "@/libs/actions/auth.actions";

// Interfaces
import { User } from "@/libs/interfaces";

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
        return await signInAction({
          email: credentials!.email,
          password: credentials!.password,
        });
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
