"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSession } from "@/context/authContext";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import * as z from "zod";
import { demoAccounts } from "@/utils/demoAccountCredentials";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { refreshSession } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  //social login handler
  const socialLoginHandler = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL,
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging User!");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Login Successfully !", { id: toastId });
        //refresh session after login
        await refreshSession();
        router.push("/");
      } catch (error) {
        toast.error("Something went wrong! Try again.", { id: toastId });
      }
    },
  });

  const fillDemoCredentials = (account: (typeof demoAccounts)[number]) => {
    form.setFieldValue("email", account.email);
    form.setFieldValue("password", account.password);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter you email"
                      aria-invalid={isInvalid}
                    ></Input>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
                        aria-invalid={isInvalid}
                        className="pr-10"
                      ></Input>
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical" className="w-full gap-4">
          <Button
            form="login-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            Login
          </Button>

          <div className="my-2 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Demo Accounts
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {demoAccounts.map((account) => (
                <Badge
                  key={account.role}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => fillDemoCredentials(account)}
                >
                  {account.role}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => socialLoginHandler()}
            className="w-full"
          >
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
