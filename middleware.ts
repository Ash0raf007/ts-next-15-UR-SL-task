import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const isAuthorized = req.cookies.get("token");
  console.log(isAuthorized)
  const url = req.url;

  const requestHeaders = new Headers(req.headers);

  // Add new request headers only if authorized
  if (isAuthorized) {
    requestHeaders.set("Authorization", `Bearer ${isAuthorized}`);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (!isAuthorized && url.includes("/all-products")) {
    return response.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthorized && url.includes("/auth/login")) {
    return response.redirect(new URL("/all-products", req.url));
  }

  return response
}
