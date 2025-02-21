import { withAuth } from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect admin routes
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  if (isAdminRoute && token.roles !== "ROLE_ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
},
{
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/account/:path*",
    "/blogs-grid/:path*"
  ],
};
