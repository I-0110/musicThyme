import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  // Not logged in → redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Trying to access teacher area without teacher role → redirect to dashboard
  if (
    nextUrl.pathname.startsWith("/teacher") &&
    session.user?.role !== "TEACHER" &&
    session.user?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/practice", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/practice/:path*",    // students
    "/teacher/:path*",     // teachers only
  ],
};