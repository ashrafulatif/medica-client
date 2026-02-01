"use client";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { refreshSession } = useSession();
  const router = useRouter();

  //social login handler
  const socialLoginHandler = async () => {
    const data = authClient.signIn.social({
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
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    ></Input>

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
        <Field orientation="vertical">
          <Button form="login-form" type="submit">
            Login
          </Button>
          <Button variant="outline" onClick={() => socialLoginHandler()}>
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            Don't have an account? <Link href="/register">Sign up</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
