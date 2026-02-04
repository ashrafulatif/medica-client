// src/lib/guards/auth.guard.ts
import { userService } from "@/services/user.service";
import { userRoles } from "@/constants/userRoles";
import { redirect } from "next/navigation";

// Single role guard
export async function authGuard(allowedRole: string) {
  const session = await userService.getSession();

  if (!session.data) {
    redirect("/login");
  }

  const userRole = session.data.user.role;

  if (userRole !== allowedRole) {
    if (userRole === userRoles.admin) redirect("/admin-dashboard");
    if (userRole === userRoles.seller) redirect("/seller-dashboard");
    if (userRole === userRoles.customer) redirect("/dashboard");
  }

  return session.data;
}

// Multi role guard
export async function multiRoleGuard(allowedRoles: string[]) {
  const session = await userService.getSession();

  if (!session.data) {
    redirect("/login");
  }

  const userRole = session.data.user.role;

  if (!allowedRoles.includes(userRole)) {
    if (userRole === userRoles.admin) redirect("/admin-dashboard");
    if (userRole === userRoles.seller) redirect("/seller-dashboard");
    if (userRole === userRoles.customer) redirect("/dashboard");
  }

  return session.data;
}
