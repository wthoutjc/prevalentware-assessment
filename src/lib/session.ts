import { authOptions } from "@/components/auth/options";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const getCurrentUser = cache(
  async (
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) => {
    const session = await getServerSession(...args, authOptions);
    return session?.user;
  }
);
