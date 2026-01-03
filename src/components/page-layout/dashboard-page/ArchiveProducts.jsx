"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const ArchiveProducts = () => {
  const [archiveProducts, setArchiveProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchArchiveProducts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/archive_products`);
      const data = await response.json();
      setArchiveProducts(data);
      setRefresh(false);
    };
    fetchArchiveProducts();
  }, [refresh]);

  const getTimeLeft = (time) => {
    const now = dayjs();
    const target = dayjs(time);
    const diffHours = target.diff(now, "hour");

    if (diffHours <= 0) return "Expired";
    if (diffHours < 24) return `${diffHours} hours`;

    const diffDays = Math.ceil(target.diff(now, "day", true));
    return `${diffDays} days`;
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_archive_product/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if (result.acknowledged === true) {
      toast.success("Product Deleted");
      setRefresh(true);
      return;
    }
  };
  return (
    <div className="w-full">
      {archiveProducts?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">
          No Archive Products
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Company</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Days Left</th>
                <th className=" text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {archiveProducts?.map((product, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="line-clamp-2">{product?.title}</div>
                    </td>
                    <td>{product?.company}</td>
                    <td>{product?.category}</td>
                    <td>{product?.subcategory}</td>
                    <td>{getTimeLeft(product?.deleted_at)}</td>
                    <td>
                      <div
                        onClick={() => handleDelete(product?._id)}
                        className="flex justify-center hover:cursor-pointer"
                      >
                        <GoTrash />
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

export default ArchiveProducts;
