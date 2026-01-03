import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  const user_id = JSON.parse(visitor.value)?.user_id;
  if (!user_id) {
    return NextResponse.json({ success: false, message: "user_id not found" });
  } else {
    return NextResponse.json({ user_id });
  }
}
