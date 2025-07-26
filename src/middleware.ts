import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("🚀 ~ middleware ~ pathname:", pathname)

  const isAuth = request.cookies.get("nevoa-app");
  console.log("🚀 ~ middleware ~ isAuth:", isAuth)

  if (!isAuth && pathname === "/panel") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel"],
};
