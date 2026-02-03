import { RegisterForm } from "@/components/modules/authentication/register-form";
import { Metadata } from "next";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Register",
  description: "Browse all medicine",
};
