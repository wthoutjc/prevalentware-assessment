import { AuthSchema } from "@/database/definitions/auth.schema";

// NextAuth
import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";

// Interfaces
import { FormState } from "../interfaces";

export async function signIn(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const { success, data, error } = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!success)
    return {
      errors: error.flatten().fieldErrors,
    };

  const res = await nextSignIn("credentials", {
    ...data,
    callbackUrl: "/dashboard",
  });

  if (res && res.error)
    return {
      message: res.error,
    };
}

export const signOut = async () => {
  await nextSignOut({
    callbackUrl: "/auth/sign-in",
  });
};
