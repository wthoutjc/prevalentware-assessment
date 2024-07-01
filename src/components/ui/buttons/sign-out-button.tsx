"use client";
import { signOut } from "next-auth/react";
import { Button } from "../button";

function SignOutButton() {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
      variant="destructive"
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
