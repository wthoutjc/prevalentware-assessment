import { DefaultSession } from "next-auth";
import { User } from "./user";

export interface AuthSigIn {
  email: string;
  password: string;
}

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}
