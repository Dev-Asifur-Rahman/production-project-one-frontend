"use server";

const { default: mongoDb, collections } = require("@/lib/mongoConnect");
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const registerUser = async (user_data) => {
  const { name, method, password } = user_data;

  const user_collection = await mongoDb(collections.users);

  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  const id = JSON.parse(visitor.value)?.user_id;
  console.log(id);

  const filter = {
    [method === "email" ? "email" : "phone"]:
      method === "email" ? user_data.email : user_data.phone,
  };

  const user_exists = await user_collection.findOne(filter);
  if (user_exists) {
    return { success: false, message: "User Already Exists" };
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const user = {
    name: name,
    user_id: id,
    method: method,
    [method === "email" ? "email" : "phone"]:
      method === "email" ? user_data.email : user_data.phone,
    password: hashed_password,
    role: "user",
    points: 0,
    level: "Bronze",
    badges_earned: ["Bronze"],
    title: "New Contributor",
    created_at: new Date(),
  };

  const result = await user_collection.insertOne(user);
  if (result.acknowledged === true)
    return { success: true, insertedId: result.insertedId.toString() };
};

export default registerUser;
