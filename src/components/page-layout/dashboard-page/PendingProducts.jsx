"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    const fetchPendingProducts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pending_products`);
      const data = await response.json();
      setPendingProducts(data);
    };

    fetchPendingProducts();
  }, [refresh]);

  const handleUpdate = (id) => {
    router.push(`/update/${id}`);
  };

  const handleApprove = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/approve_pending_product/${id}`,
      {
        method: "POST",
      }
    );
    const result = await response.json();
    if (result.acknowledged === true) {
      toast.success("product added");
      setRefresh(!refresh)
    }
  };
  return (
    <section>
      {pendingProducts.length === 0 ? (
        <p className="text-center text-2xl mb-4 font-semibold w-full">
          No Pending Products
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Validity</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Modify</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts?.map((product, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="line-clamp-2">{product?.title} </div>
                    </td>
                    <td>{product?.company}</td>
                    <td>{product?.status}</td>
                    <td>
                      <div className="flex justify-center">
                        {product?.validation}
                      </div>
                    </td>
                    <td>{product?.category}</td>
                    <td>{product?.subcategory}</td>
                    <td
                      onClick={() => handleUpdate(product?._id)}
                      className="hover:underline hover:cursor-pointer"
                    >
                      Update
                    </td>
                    <td
                      onClick={() => handleApprove(product?._id)}
                      className="hover:underline hover:cursor-pointer"
                    >
                      <div className=" flex justify-center">
                        <IoMdCheckmarkCircleOutline />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PendingProducts;
