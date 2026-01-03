import SavedProducts from "@/components/page-layout/saved-products/SavedProducts";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  const user_id = JSON.parse(visitor.value)?.user_id;

  const saved_products_collections = await mongoDb(collections.saved_products);
  const saved_products = await saved_products_collections
    .find({ user_id: user_id })
    .toArray();

  const productIds = saved_products.map(
    (item) => new ObjectId(item.product_id)
  );
  
  const products_collection = await mongoDb(collections.products);
  const products = await products_collection
    .find({ _id: { $in: productIds } })
    .toArray();

  const updated_products = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
  return (
    <section>
      {products.length === 0 ? (
        <p className="text-2xl font-semibold text-center">No Products Saved</p>
      ) : (
        <SavedProducts products={updated_products}></SavedProducts>
      )}
    </section>
  );
};

export default page;
