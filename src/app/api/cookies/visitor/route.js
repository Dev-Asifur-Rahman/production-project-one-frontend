const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function GET(req) {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  const user_id = JSON.parse(visitor.value)?.user_id;
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}
/recent_clicks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    }
  );

  const result = await response.json();

  return NextResponse.json(result);
}

export async function POST(req) {
  const cookieStore = await cookies();
  const product_object = await req.json();

  const visitor = cookieStore.get("visitor");
  const user_id = JSON.parse(visitor.value)?.user_id;
  const clicked_product = {
    user_id,
    product_id: product_object?._id,
    category: product_object?.category,
  };

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}
/upload_click_products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clicked_product),
    }
  );

  const result = await response.json();

  return NextResponse.json(result);
}
