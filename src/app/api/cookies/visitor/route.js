const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function GET(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  if (visitor) {
    return NextResponse.json({ data: JSON.parse(visitor.value) });
  } else {
    return NextResponse.json({ data: {} });
  }
}

export async function POST(req) {
  const cookieStore = await cookies();
  const category_object = await req.json();

  const visitor_cookie = cookieStore.get("visitor");
  const visitor = JSON.parse(visitor_cookie.value);

  return NextResponse.json({visitor,category_object});
}
