import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SessionProvider } from "@/context/authContext";
import { userService } from "@/services/user.service";

import React from "react";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const initialUser = data?.user || null;

  return (
    <SessionProvider initialUser={initialUser}>
      <div>
        <Navbar cartItemsCount={0} />
        {children}
        <Footer />
      </div>
    </SessionProvider>
  );
}
