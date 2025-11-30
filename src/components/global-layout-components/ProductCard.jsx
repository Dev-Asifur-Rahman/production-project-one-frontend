"use client";
import { useState } from "react";
import { GiPriceTag } from "react-icons/gi";
import { MdLabelImportant } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useRouter } from "next/navigation";
import CornerRibbon from "./CornerRibbon";

const ProductCard = ({ product }) => {
  const [isLiked, setLiked] = useState(false);
  const router = useRouter();

  const id = "id";
  // https://slickdeals.net/f/18786394-the-north-face-men-s-vault-backpack-clay-gray-new-taupe-green-39-macy-s?src=frontpage&attrsrc=Frontpage%3AType%3AMissed
  return (
    <div
      onClick={() =>
        router.push(`/product/${product?._id ? product?._id : id}`)
      }
      className="relative overflow-hidden w-full max-w-[200px] p-2  bg-[#d1e2f5] hover:bg-[#76ace9] rounded-lg shadow-2xl my-2 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* ribbon component  */}
      <CornerRibbon></CornerRibbon>
      {/* product image  */}
      <div className="w-full relative bg-[#F0F0F0] mt-1 rounded-md overflow-hidden flex justify-center items-center">
        <img
          src={
            product?.product_image
              ? product?.product_image
              : "https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
          }
          alt="Bag"
          className="w-full aspect-square object-contain mix-blend-multiply"
        />

        <div className="absolute top-2 left-2 badge badge-xs rounded-sm badge-soft badge-primary font-medium">
          For You
        </div>
      </div>

      {/* product name  */}
      <p className="mt-2 line-clamp-2 text-[12px] font-medium">
        {
          product?.title ? product.title : 'Unknown'
        }
      </p>

      {/* price  */}
      <div className="flex items-center gap-3 mt-2 font-medium">
        <GiPriceTag />
        <p>{product?.regular_price ? product?.regular_price + '$' : 'Unknown'}</p>
        {/* discount  */}
        <span className="line-through text-[12px] font-semibold text-red-600">
          {product?.offer_price ? product?.offer_price + "$": 'Unknown'}
        </span>
      </div>

      {/* brand name  */}
      <div className="flex items-center gap-3">
        <MdLabelImportant /> <span className="font-medium text-sm">{product?.company ? product?.company : 'Unknown'}</span>
      </div>

      <hr className="w-full mt-2 text-[#999999]" />

      {/* like comment share  */}
      <div className="mt-2 w-full flex justify-between items-center">
        {/* like  */}
        <div className="flex items-center gap-1">
          {isLiked ? <FcLike /> : <FcLikePlaceholder />}{" "}
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
  );
};

export default ProductCard;
