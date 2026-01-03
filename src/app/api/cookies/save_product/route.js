import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");

  const object = await req.json();
  const user_id = JSON.parse(visitor.value)?.user_id;

  const { id,title } = object;

  const saved_product_object = {
    title,
    product_id: id,
    user_id,
  };

  const res = await fetch(`${process.env.NEXT_BACKEND_URL}/upload_saved_product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saved_product_object),
  });

  const result = await res.json();

  return NextResponse.json(result);
}
