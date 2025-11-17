const page = async ({ params }) => {
  const { category } = await params;
  return <div
  className=" w-full">{category}</div>;
};

export default page;
