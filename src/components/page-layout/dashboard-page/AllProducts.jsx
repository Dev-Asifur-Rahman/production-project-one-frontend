"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdArchive } from "react-icons/md";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin_get_products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [refresh]);

  const handleArchive = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/archive_existing_product/${id}`,{
        method : 'POST'
      }
    );
    const result = await res.json()
    if(result.acknowledged === true){
        toast.success('product archived')
        setRefresh(!refresh)
        return
    }
  };

  const handleNavigate = (id) => {
    router.push(`/existing_product_update/${id}`);
  };
  return (
    <div>
      {products?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">
          No Products Available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Company</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Modify</th>
                <th>Archive</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="line-clamp-2">{product?.title}</div>
                    </td>
                    <td>{product?.company}</td>
                    <td>{product?.category}</td>
                    <td>{product?.subcategory || "not added"}</td>
                    <td
                      onClick={() => handleNavigate(product?._id)}
                      className="hover:underline hover:cursor-pointer"
                    >
                      Update
                    </td>
                    <td>
                      <div
                        onClick={() => handleArchive(product?._id)}
                        className="flex justify-center hover:cursor-pointer"
                      >
                        <MdArchive />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
