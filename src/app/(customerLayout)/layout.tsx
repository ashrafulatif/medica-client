import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { userRoles } from "@/constants/userRoles";
import { SessionProvider } from "@/context/authContext";
import { authGuard } from "@/lib/auth.guard";
import { userService } from "@/services/user.service";

import React from "react";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authGuard(userRoles.customer);

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
