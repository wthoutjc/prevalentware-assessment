import { NextAuthOptions } from "next-auth";
import * as bcrypt from "bcryptjs";

// Providers
import Credentials from "next-auth/providers/credentials";

// Auth Actions
import { Roles, User } from "@/lib";

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
      async authorize(credentials): Promise<User | null> {
        const user = await db.user.findUnique({
          where: { email: credentials!.email },
        });

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Roles,
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
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
