import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Roles } from "./lib/enums/roles.enum";
import { User } from "./lib/interfaces";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isAuthPage =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage) {
    if (isAuth) {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard`;
      return NextResponse.redirect(url);
    }
    return;
  }

  if (!isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  } else {
    const { user } = token;

    const adminPages =
      request.nextUrl.pathname.startsWith("/users") ||
      request.nextUrl.pathname.startsWith("/reports");

    switch ((user as User).role) {
      case Roles.USER:
        if (adminPages) {
          const url = request.nextUrl.clone();
          url.pathname = "/dashboard";
          return NextResponse.redirect(url);
        }
        break;
      default:
        break;
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
