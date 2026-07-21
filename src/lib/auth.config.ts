import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.plan = token.plan as string | null;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") return NextResponse.redirect(new URL("/", nextUrl));
        return true;
      }

      if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
        return isLoggedIn;
      }

      const VERIFIED_REQUIRED_PATHS = ["/checkout", "/booking", "/personal-trainer/book"];
      if (VERIFIED_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
        if (!isLoggedIn) {
          return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl));
        }
        if (!auth?.user?.isVerified) {
          return NextResponse.redirect(new URL(`/verify-email?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl));
        }
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
