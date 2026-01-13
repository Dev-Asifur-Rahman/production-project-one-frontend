import mongoDb, { collections } from "@/lib/mongoConnect";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const cookieStore = await cookies();

  const visitor = cookieStore.get("visitor");
  const id = JSON.parse(visitor?.value)?.user_id;
   
  if(!token){
    return NextResponse.json({success : false , message : 'token not found'
    })
  }

  if (token) {
    const user_collection = await mongoDb(collections.users);
    const find_user = await user_collection.findOne({ email: token?.email });
    if (!find_user) {
      return NextResponse.json({ user_id: id });
    } else {
      const user_id = find_user?.user_id;
      if (!user_id) {
        const result = await user_collection.updateOne(
          {
            email: find_user?.email,
          },
          {
            $set: {
              user_id: id,
            },
          }
        );
        return NextResponse.json({ user_id: id });
      } else {
        const user_cookie = {
          user_id: user_id,
          createdAt: new Date().toISOString(),
        };
        const res = NextResponse.json({ user_id: user_id });
        res.cookies.set("visitor", JSON.stringify(user_cookie), {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 365,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        return res;
      }
    }
  }
}
