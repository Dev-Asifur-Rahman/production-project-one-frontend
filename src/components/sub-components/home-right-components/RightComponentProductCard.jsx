"use client";
import React, { useState } from "react";
import { GiPriceTag } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useRouter } from "next/navigation";

const RightComponentProductCard = ({ product }) => {
  const [isLiked, setLiked] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${product?._id}`)}
      className="cursor-pointer  w-full p-2 flex border-b border-b-[#F0F0F0] hover:bg-[#d1e2f5]"
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
          <GiPriceTag />
          <p>{product?.offer_price} TK</p>
          {/* discount  */}
          <span className="line-through text-[12px] text-red-500">
            {product?.regular_price} TK
          </span>
        </div>

        <hr className="w-full mt-2 text-[#F0F0F0]" />

        {/* like comment share  */}
        <div className="mt-2 w-full flex justify-between items-center">
          {/* like  */}
          <div className="flex items-center gap-1">
            {isLiked ? <FcLike /> : <FcLikePlaceholder />}
            <span className="text-sm">23</span>
          </div>
          {/* comment  */}
          <div className="flex items-center gap-1">
            <MdOutlineInsertComment />
            <span className="text-sm">6</span>
          </div>
          {/* share  */}
          <div className="flex items-center gap-1">
            <IoMdShare />
            <span className="text-sm">2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightComponentProductCard;
