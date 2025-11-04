import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const proxy = async (req) => {
  const token = await getToken({req})
  console.log(req.url);
  return NextResponse.next();
};
