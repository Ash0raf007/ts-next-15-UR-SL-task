import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const isAuthorized = req.cookies.get("token");
  console.log(isAuthorized)
  const url = req.url;

  if (!isAuthorized && url.includes("/all-products")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const requestHeaders = new Headers(req.headers);

  
  // Add new request headers only if authorized
  if (isAuthorized) {
    requestHeaders.set("Authorization", `Bearer ${isAuthorized}`);
  }

  if (isAuthorized && url.includes("/auth/login")) {
    return NextResponse.redirect(new URL("/all-products", req.url));
  }
}
