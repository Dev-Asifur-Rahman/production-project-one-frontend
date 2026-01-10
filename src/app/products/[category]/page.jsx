import ProductsSection from "@/components/page-layout/product-page/ProductsSection";
import { decode } from "next-auth/jwt";

const page = async ({ params, searchParams }) => {
  const { category } = await params;
  const { subcategory } = await searchParams;
  const deCodedCategory = decodeURIComponent(category);
  const deCodedSubCategory = decodeURIComponent(subcategory);

  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL}/get_products/${encodeURIComponent(
      category
    )}?subcategory=${encodeURIComponent(subcategory)}`
  );
  const data = await res.json();
  console.log(data)
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <div className="my-5">
        <p className="font-bold text-3xl text-center">{deCodedCategory}</p>
        <p className="font-medium text-xl text-center">
          {deCodedSubCategory === "undefined" ? "" : deCodedSubCategory}
        </p>
      </div>

      <div className="w-full">
        {data?.length === 0 ? (
          <p className="text-center">No Product Found</p>
        ) : (
          <ProductsSection get_products={data}></ProductsSection>
        )}
      </div>
    </div>
  );
};

export default page;
