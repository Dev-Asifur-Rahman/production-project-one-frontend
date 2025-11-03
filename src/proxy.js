import { NextResponse } from "next/server";

export const proxy = (request) => {
  console.log(request.url);
  return NextResponse.next();
};
