import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");

  const object = await req.json();
  const user_id = JSON.parse(visitor.value)?.user_id;

  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/upload_comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      product_id: object?.id,
      comment: object?.comment,
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}
