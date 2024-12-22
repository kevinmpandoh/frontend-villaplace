import { NextResponse } from "next/server";

export function middleware() {
  const tokenUser = request.cookies.get("tokenUser");
  const tokenAdmin = request.cookies.get("tokenAdmin");
  const tokenOwner = request.cookies.get("tokenOwner");

  const path = request.nextUrl.pathname;

  // Redirect to home if logged in users access login page
  if (tokenUser) {
    if (path.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle specific role-based access
  if (tokenAdmin) {
    if (path.startsWith("/dashboard/mitra") || path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (path.startsWith("/category/:path/booking")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (path.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  if (tokenOwner) {
    if (path.startsWith("/dashboard/admin") || path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard/mitra", request.url));
    }

    if (path.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/dashboard/mitra", request.url));
    }
  }

  if (tokenUser) {
    if (
      path.startsWith("/dashboard/admin") ||
      path.startsWith("/dashboard/mitra") ||
      path.startsWith("/auth")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect unauthenticated users
  if (!tokenUser && !tokenAdmin && !tokenOwner) {
    if (
      !path.startsWith("/auth") && // Allow access to authentication pages
      !path.startsWith("/public") // Allow access to public pages
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/mitra/:path*",
    "/auth/:path*",
    "/user/:path*",
    "/category/:path/booking",
  ],
};
