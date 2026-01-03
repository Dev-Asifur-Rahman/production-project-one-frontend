"use server";

import mongoDb, { collections } from "@/lib/mongoConnect";
import bcrypt from "bcrypt";

const loginUser = async (user_data) => {
  const { method, password } = user_data;
  const user_collection = await mongoDb(collections.users);

  const filter = {
    [method === "email" ? "email" : "phone"]:
      method === "email" ? user_data.email : user_data.phone,
  };

  const user = await user_collection.findOne(filter);
  if (!user) {
    return null;
  } else {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return null;
    } else {
      return {
        id: user._id.toString(),
        name: user.name,
        method: user.method,
        [user.method]: user.method === "email" ? user.email : user.phone,
        role: user.role,
      };
    }
  }
};

export default loginUser;
