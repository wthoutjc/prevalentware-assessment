import { ApolloServer } from "@apollo/server";
import { User } from "@prisma/client";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { userResolvers } from "@/components/graphql/resolvers/user-resolvers";
import { userTypeDefs } from "@/components/graphql/user-defs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/options";

declare module "@apollo/server" {
  interface Context {
    user?: User;
  }
}

const apolloServer = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: {
    ...userResolvers,
  },
});

export const handler = startServerAndCreateNextHandler<NextRequest>(
  apolloServer,
  {
    context: async () => {
      const session = await getServerSession(authOptions);

      return {
        user: session?.user,
      };
    },
  }
);

export { handler as GET, handler as POST };
