"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="outline"
      className="min-w-full bg-[--secondary-color] text-[--primary-contrast-color]"
    >
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
}

export default SubmitButton;
