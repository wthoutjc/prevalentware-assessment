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
