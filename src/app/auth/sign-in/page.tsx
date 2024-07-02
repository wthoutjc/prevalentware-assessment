"use client";
import { useState } from "react";
import { useFormState } from "react-dom";

// Action
import { signIn } from "@/lib/actions/auth.actions";

// Components
import SubmitButton from "@/components/ui/buttons/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  const [state, action] = useFormState(signIn, undefined);
  const [show, setShow] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 p-4 w-full justify-center items-center"
      action={action}
    >
      <Card className="flex flex-col gap-2 rounded-xl max-w-[450px]">
        <CardHeader>
          <CardTitle>PrevalentWare Assessment</CardTitle>
          <CardDescription>
            By{" "}
            <a
              href="https://www.ionjc.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[--primary-color]"
            >
              Juan Camilo Ramírez Rátiva
            </a>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <h4 className="text-lg font-semibold">Sign in</h4>
        </CardContent>

        <CardContent>
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input type="email" name="email" placeholder="john@example.com" />
          </div>
          {state?.errors?.email && (
            <p className="text-xs text-[--error-color]">
              {state?.errors?.email}
            </p>
          )}

          <div className="flex flex-col mt-3">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input
              id="password"
              type={show ? "text" : "password"}
              name="password"
              placeholder="********"
              autoComplete="off"
            />
          </div>
          <div>
            <Button
              type="button"
              variant="link"
              className="p-0 mb-0"
              onClick={() => setShow((prev) => !prev)}
            >
              <span className="text-sm text-[--primary-color]">
                {show ? "Hide" : "Show"} password
              </span>
            </Button>
          </div>

          {state?.errors?.password && (
            <div className="text-xs text-[--error-color]">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
