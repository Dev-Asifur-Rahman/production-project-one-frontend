"use server";

const { default: mongoDb, collections } = require("@/lib/mongoConnect");

const getCategory = async () => {
  const category_collection = await mongoDb(collections.categories);
  const result = await category_collection.find().toArray();
  return result.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));
};

export default getCategory;
