// import { getSession } from "next-auth/react";
import { db } from "@/database";
import { Roles } from "@/lib";
import {
  Context,
  CreateUserArgs,
  UpdateUserArgs,
  UserArgs,
} from "@/lib/interfaces/graph";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      return db.user.findUnique({
        where: { id: context.user.id },
      });
    },
    allUsers: async (_: any, __: any, context: Context) => {
      if (!context.user || context.user.role !== Roles.ADMIN) {
        throw new Error("Not authorized");
      }

      return db.user.findMany();
    },
    getUser: async (_: any, { id }: UserArgs, context: Context) => {
      if (!context.user || context.user.role !== Roles.ADMIN) {
        throw new Error("Not authorized");
      }

      return db.user.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createUser: async (parent: any, user: CreateUserArgs, context: Context) => {
      if (!context.user || context.user.role !== Roles.ADMIN) {
        throw new Error("Not authorized");
      }

      return db.user.create({
        data: { ...user },
      });
    },
    updateUser: async (_: any, user: UpdateUserArgs, context: Context) => {
      if (!context.user || context.user.role !== Roles.ADMIN) {
        throw new Error("Not authorized");
      }

      return db.user.update({
        where: { id: user.id },
        data: { ...user },
      });
    },
    deleteUser: async (_: any, { id }: UserArgs, context: Context) => {
      return db.user.delete({
        where: { id },
      });
    },
  },
};
