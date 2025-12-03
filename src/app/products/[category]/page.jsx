import ProductCard from "@/components/global-layout-components/ProductCard";

const page = async ({ params }) => {
  const { category } = await params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/get_products`);
  const data = await res.json();
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <p className="font-bold text-3xl text-center my-5">{category}</p>
      {/* <div className="w-full">
        {data?.length === 0 ? (
          <p className="text-center">No Product Found</p>
        ) : (
          <div className=" grid lg:grid-cols-4 md:grid-cols-3 smd:grid-cols-2 grid-cols-1 place-items-center">
            {data?.map((product, index) => {
              return <ProductCard product={product} key={index}></ProductCard>;
            })}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default page;
