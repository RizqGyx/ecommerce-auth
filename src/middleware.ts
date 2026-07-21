import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/checkout/:path*",
    "/booking/:path*",
    "/personal-trainer/book/:path*",
  ],
};
