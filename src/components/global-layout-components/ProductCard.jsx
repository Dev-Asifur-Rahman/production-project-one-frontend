"use client";

import { MdLabelImportant, MdOutlineInsertComment } from "react-icons/md";

import { useRouter } from "next/navigation";
import CornerRibbon from "./CornerRibbon";
import { useContext } from "react";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { FcLike } from "react-icons/fc";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { lan } = useContext(LanguageContext);
  console.log(product)

  const handleRoute = async (product) => {
    console.log("hitted");
    // make product object like {product : category}
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
      className="relative overflow-hidden w-full max-w-[200px] rounded-lg  my-2 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* ribbon component  */}
      <CornerRibbon discount={product?.offer_percent}></CornerRibbon>
      {/* product image  */}
      <div className="w-full relative bg-[#F0F0F0] mt-1 rounded-md shadow-lg overflow-hidden flex justify-center items-center">
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

      <div className="w-full rounded-md shadow-md bg-white dark:bg-inherit my-2 dark:border-2 p-2">
        <div className="badge badge-sm badge-soft badge-success  rounded-sm capitalize">{product?.category}</div>
        {/* product name  */}
        <p className="mt-1 line-clamp-1 text-xs font-semibold font-sans">
          {product?.title ? product.title : "Unknown"}
        </p>
        {/* price  */}
        <div className="flex items-center gap-3 mt-2 font-medium">
          {/* <GiPriceTag /> */}
          {/* <img className="w-4 aspect-square bg-white" src="/logo/taka-logo.png" alt="" /> */}
          <p className="text-[12px]">
            ৳{" "}
            {product?.offer_price
              ? product?.offer_price + ` ${translation[lan].common.taka}`
              : ""}
          </p>
          {/* discount  */}
          <span className="line-through text-[12px] font-semibold text-red-600">
            {product?.regular_price
              ? product?.regular_price + ` ${translation[lan].common.taka}`
              : ""}
          </span>
          {/* brand name  */}
          <div className="flex items-center gap-3">
            <MdLabelImportant />{" "}
            <span className="font-medium text-xs">
              {product?.company ? product?.company : ""}
            </span>
          </div>

          {/* like and comments  */}
          <div className="flex items-center gap-3 mt-2">
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
          </div>
        </div>
      </div>
      <button className="btn btn-sm w-full  bg-dealbondhu text-white shadow-2xl">
        DETAILS
      </button>
    </div>
  );
};

export default ProductCard;
