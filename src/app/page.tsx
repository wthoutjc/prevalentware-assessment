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

export default function Home() {
  const [state, action] = useFormState(signIn, undefined);
  const [show, setShow] = useState(false);

  const handleShowPassword = () => setShow((prev) => !prev);

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <form className="flex flex-col gap-4 p-4 min-w-[450px]" action={action}>
        <Card className="flex flex-col gap-2 rounded-xl">
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
              />
            </div>
            <div>
              <Button
                type="button"
                variant="link"
                className="p-0 mb-0"
                onClick={handleShowPassword}
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
    </section>
  );
}
