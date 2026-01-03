"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const SavedProducts = ({ products }) => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const {lan} = useContext(LanguageContext)

  const handleDeleteSavedProduct = async (id) => {
    const user_res = await fetch("/api/cookies/get_user_id");
    const user_object = await user_res.json();
    const user_id = user_object?.user_id;
    if (!user_id) {
      return toast.error("user not found");
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_saved_product/${id}?user_id=${user_id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (result.acknowledged === true) {
        router.refresh();
        return toast.success("Product Deleted");
      } else {
        return toast.error(result.message);
      }
    }
  };

  const handleRoute = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <section>
      {products?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">No Product Saved</p>
      ) : (
        <section className="mb-5">
          <p
            className="text-2xl font-semibold text-center mt-3
           mb-6"
          >
            {translation[lan].savedItems.heading}
          </p>
          <section className="w-full md:w-4/5 mx-auto px-3 my-5 flex flex-col gap-2">
            {products?.map((product, index) => {
              return (
                <div className="p-1 flex" key={index}>
                  <div className="bg-[#F0F0F0] w-1/4 max-w-40 aspect-square md:rounded-2xl rounded-lg flex-shrink-0">
                    <img
                      src={product?.product_image}
                      className="w-full aspect-square object-contain rounded-2xl mix-blend-multiply"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-around ml-2 text-xs font-semibold">
                    <p className="line-clamp-1 lg:text-xl text-sm">
                      {product?.title}
                    </p>
                    <div className="flex flex-col smd:gap-1 smd:text-base">
                      <p>
                        {translation[lan].common.category} :{" "}
                        <span className="font-normal">{product?.category}</span>
                      </p>
                      <p>
                        {translation[lan].common.price} :{" "}
                        <span className="font-normal">
                          {product?.offer_price} {translation[lan].common.taka}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3    smd:text-sm">
                      <p
                        onClick={() => handleRoute(product?._id)}
                        className="link link-hover text-blue-400"
                      >
                        {translation[lan].common.see_details}
                      </p>
                      <p
                        onClick={() => handleDeleteSavedProduct(product?._id)}
                        className="link link-hover text-red-400"
                      >
                        {translation[lan].common.delete}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      )}
    </section>
  );
};

export default SavedProducts;
