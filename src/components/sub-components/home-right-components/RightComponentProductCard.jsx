"use client";
import React, { useContext } from "react";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useRouter } from "next/navigation";
import translation from "@/utils/translation";
import { LanguageContext } from "@/context/GlobalLanguageProvider";

const RightComponentProductCard = ({ product }) => {
  const router = useRouter();
  const {lan} = useContext(LanguageContext)

  const handleRoute = async (product) => {
    fetch("/api/cookies/visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/product/${product?._id}`);
      });
  };
  return (
    <div
      onClick={() => handleRoute(product)}
      className="cursor-pointer  w-full p-2 flex border-b border-b-[#F0F0F0]"
    >
      {/* img section  */}
      <div className="w-1/3 max-w-[100px] md:w-2/4 aspect-square bg-[#F0F0F0]  rounded-lg">
        <img
          src={product?.product_image}
          className="w-full h-full rounded-lg mix-blend-multiply"
          alt=""
        />
      </div>

      {/* description section  */}
      <div className="w-2/3  px-1 text-sm ">
        {/* product name  */}
        <p className="line-clamp-2 min-h-10">{product?.title}</p>

        {/* price  */}
        <div className="flex items-center gap-3 mt-2 font-medium">
          
          {/* <img className="w-4 aspect-square" src="/logo/taka-logo.png" alt="" /> */}
          <p>৳ {product?.offer_price} {translation[lan].common.taka}</p>
          {/* discount  */}
          <span className="line-through text-[12px] text-red-500">
            {product?.regular_price} {translation[lan].common.taka}
          </span>
        </div>

        <hr className="w-full mt-2 text-[#F0F0F0]" />

        {/* like comment share  */}
        <div className="mt-2 w-full flex items-center gap-3">
          {/* like  */}
          <div className="flex items-center gap-1">
            <FcLike />
            <span className="text-sm">{product?.likes || 0}</span>
          </div>
          {/* comment  */}
          <div className="flex items-center gap-1">
            <MdOutlineInsertComment />
            <span className="text-sm">{product?.comments || 0}</span>
          </div>
          {/* share  */}
          {/* <div className="flex items-center gap-1">
            <IoMdShare />
            <span className="text-sm">2</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RightComponentProductCard;
