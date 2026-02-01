import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { userRoles } from "./constants/userRoles";

export const proxy = async (request: NextRequest) => {
  const userSession = await userService.getSession();
  const pathname = request.nextUrl.pathname;

  let userRole: string | null = null;
  let isAuthenticated = false;

  if (userSession.data) {
    isAuthenticated = true;
    userRole = userSession.data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if admin tries to access seller dashboard
  if (pathname.startsWith("/admin-dashboard") && userRole !== userRoles.admin) {
    if (userRole === userRoles.seller) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
    if (userRole === userRoles.customer) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if seller tries to access admin dashboard
  if (
    pathname.startsWith("/seller-dashboard") &&
    userRole !== userRoles.seller
  ) {
    if (userRole === userRoles.admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (userRole === userRoles.customer) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};
