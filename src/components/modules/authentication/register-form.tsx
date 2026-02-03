"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.enum(["CUSTOMER", "SELLER"], { message: "Role is required" }),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Social login handler
  const socialLoginHandler = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL,
    });
    console.log(data);
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const { data, error } = await authClient.sendVerificationEmail({
        email: userEmail,
      });

      if (error) {
        toast.error(error.message || "Failed to resend email");
      } else {
        toast.success("Verification email sent successfully!");
      }
    } catch (error: any) {
      toast.error("Failed to resend email");
    } finally {
      setIsResending(false);
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Registering User!");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        // Show email verification message
        setUserEmail(value.email);
        setEmailSent(true);
        toast.success(
          "Registration successful! Check your email for verification.",
          { id: toastId },
        );
      } catch (error) {
        toast.error("Something went wrong! Try again.", { id: toastId });
      }
    },
  });

  // Show email verification message
  if (emailSent) {
    return (
      <Card {...props}>
        <CardHeader className="text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We sent a verification link to <strong>{userEmail}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={resendVerificationEmail}
            variant="outline"
            disabled={isResending}
            className="w-full"
          >
            {isResending ? "Resending..." : "Resend Verification Email"}
          </Button>
          <FieldDescription className="text-center">
            <Link href="/login">Back to Login</Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    );
  }

  // return your existing form
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
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* All your existing form fields remain exactly the same */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your full name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

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
                      placeholder="Enter your email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      type="tel"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your phone number"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as "CUSTOMER" | "SELLER")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                        <SelectItem value="SELLER">Seller</SelectItem>
                      </SelectContent>
                    </Select>
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
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                    />
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
          <Button form="register-form" type="submit">
            Register
          </Button>
          <Button variant="outline" onClick={() => socialLoginHandler()}>
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Login</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
