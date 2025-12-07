const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function POST(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");

  const object = await req.json();
  const user_id = JSON.parse(visitor.value)?.user_id;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}
/like_product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, product_id: object }),
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}
