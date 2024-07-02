import { Roles } from "../enums";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Roles;
  created_at?: string;
  updated_at?: string;
}
