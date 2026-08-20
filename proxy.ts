import { NextRequest, NextResponse } from "next/server";
import { decrypt, sessionCookieName } from "@/app/lib/session";

const protectedRoutes = ["/dashboard", "/documents"];
const publicRoutes = ["/login", "/login/register", "/"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
  const isPublicRoute = publicRoutes.includes(path);
  const session = await decrypt(request.cookies.get(sessionCookieName)?.value);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && session?.userId && path !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};