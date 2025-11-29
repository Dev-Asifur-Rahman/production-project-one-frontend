const page = async ({ params }) => {
  const { category } = await params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/get_products`);
  const data = await res.json();
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <p className="font-bold text-3xl text-center my-5">All Products</p>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Serial No</th>
              <th>Name</th>
              <th>Company</th>
              <th>Product Link</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product, index) => {
              return (
                <tr key={index}>
                  <th className="text-center">{index + 1}</th>
                  <td>
                    {" "}
                    <div className="line-clamp-1">{product.title}</div>
                  </td>
                  <td>{product.company}</td>
                  <td>
                    <div className="line-clamp-1">{product.product_link}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
