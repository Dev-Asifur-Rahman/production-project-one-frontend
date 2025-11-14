"use client";
import { useState } from "react";
import { GiPriceTag } from "react-icons/gi";
import { MdLabelImportant } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useRouter } from "next/navigation";


const ProductCard = () => {
  const [isLiked, setLiked] = useState(false);
  const router = useRouter();

  const id = "id";
  // https://slickdeals.net/f/18786394-the-north-face-men-s-vault-backpack-clay-gray-new-taupe-green-39-macy-s?src=frontpage&attrsrc=Frontpage%3AType%3AMissed
  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className=" w-full max-w-[200px] p-2  bg-[#FFFFFF] rounded-lg shadow-2xl my-2 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* avatar and found people  */}
      
      {/* <div className=" w-full flex items-center gap-1">
        <div className="avatar">
          <div className="w-7 rounded-full ">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <p className="line-clamp-1 text-[12px] font-semibold">
          Found By Josh Tailor
        </p>
      </div> */}

      {/* product image  */}
      <div className="w-full relative bg-[#F0F0F0] mt-1 rounded-md overflow-hidden flex justify-center items-center">
        <img
          src="https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
          alt="Bag"
          className="w-full aspect-square object-contain mix-blend-multiply"
        />

        <div className="absolute top-2 left-2 badge badge-xs rounded-sm badge-soft badge-primary font-medium">
          For You
        </div>
      </div>

      {/* product name  */}
      <p className="mt-2 line-clamp-2 text-[12px] font-medium">
        The North Face Men's Vault Backpack (Clay Gray/New Taupe Green, Fits 15"
        Laptop)
      </p>

      {/* price  */}
      <div className="flex items-center gap-3 mt-2 font-medium">
        <GiPriceTag />
        <p>$39</p>
        {/* discount  */}
        <span className="line-through text-[12px] text-red-500">$45</span>
      </div>

      {/* brand name  */}
      <div className="flex items-center gap-3">
        <MdLabelImportant /> <span className="font-medium text-sm">Amazon</span>
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
