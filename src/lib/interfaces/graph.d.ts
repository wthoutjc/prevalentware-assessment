import { Role, User } from "@prisma/client";

export interface Context {
  user?: User;
}

export interface UserArgs {
  id: string;
}

export interface CreateUserArgs {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}

export interface UpdateUserArgs {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: Role;
}
