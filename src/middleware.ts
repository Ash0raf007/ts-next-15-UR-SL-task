import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.url;

  const requestHeaders = new Headers(req.headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const redirectTo = (path: string, isLogin: boolean = false) => {
    const redirectResponse = NextResponse.redirect(new URL(path, req.url));
    if (!isLogin) {
      redirectResponse.headers.set("Authorization", `Bearer ${token}`);
    }
    return redirectResponse;
  };

  if (!token && url.includes("/all-products")) {
    return redirectTo("/auth/login", false);
  }

  if (token && url.includes("/auth/login")) {
    return redirectTo("/all-products", true);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
