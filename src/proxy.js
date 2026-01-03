import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const proxy = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const visitor_cookie = req.cookies.get("visitor");

  const { pathname } = req.nextUrl;
  const homeUrl = new URL("/", req.url);
  const res = NextResponse.next();

  // set cookie if now found
  if (!visitor_cookie) {
    const create_visitor_cookie = {
      user_id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    res.cookies.set("visitor", JSON.stringify(create_visitor_cookie), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/verify_reset_code") ||
    pathname.startsWith("/reset_new_password")
  ) {
    if (token) {
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname === "/dashboard") {
    if (token?.role !== "admin") {
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname === "/saved_products") {
    if (!token) {
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname.startsWith("/update")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(homeUrl);
    }
  }
  return res;
};
