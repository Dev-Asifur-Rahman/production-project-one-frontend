const page = async ({ params }) => {
  const { category } = await params;
  return <div
  className="border w-full h-full">{category}</div>;
};

export default page;
