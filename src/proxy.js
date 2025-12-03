import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const proxy = async (req) => {
  const token = await getToken({ req });
  const visitor_cookie = req.cookies.get("visitor");

  const { pathname } = req.nextUrl;
  const res = NextResponse.next()

  console.log(pathname);

  // set cookie if now found 
  if (!visitor_cookie) {
    const create_visitor_cookie = {
      user_id: crypto.randomUUID(),
      categories: [],
      createdAt: new Date().toISOString(),
    };
    res.cookies.set("visitor", JSON.stringify(create_visitor_cookie), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      // secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  return res;
};
