import { LoginForm } from "@/components/modules/authentication/login-form";
import { Metadata } from "next";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Login",
  description: "Browse all medicine",
};
