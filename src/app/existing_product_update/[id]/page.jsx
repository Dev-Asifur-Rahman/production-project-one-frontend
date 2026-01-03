import ExistingProductUpdateForm from "@/components/page-layout/existing-product-uptade/ExistingProductUpdateForm";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_BACKEND_URL}/admin_get_product/${id}`);
  const data = await res.json();
  return <ExistingProductUpdateForm product={data}></ExistingProductUpdateForm>;
};

export default page;
