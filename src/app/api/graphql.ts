import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const cors = Cors();

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    phone: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    me: User
  }
`;

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      return prisma.user.findUnique({
        where: { id: context.user.id },
      });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req });
    return { user: session?.user, prisma };
  },
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
