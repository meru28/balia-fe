import { withAuth } from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  function middleware(req) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.nextauth.token;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
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
  ],
};
