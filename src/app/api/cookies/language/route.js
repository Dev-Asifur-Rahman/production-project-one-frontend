import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   const cookieStore = await cookies();
//   const get_lang = cookieStore.get("lang");
//   // const lang = get_lang.value?.lang;
//   return NextResponse.json({message : 'route hitted'});
// }

export async function POST(req) {
  const cookieStore = await cookies();
  const lang_object = await req.json();

  const lang = lang_object?.lang;
  cookieStore.set("lang", JSON.stringify(lang_object), {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return NextResponse.json(lang);
}
