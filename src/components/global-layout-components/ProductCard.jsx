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
      <div className="w-full relative bg-[#F0F0F0] mt-1 rounded-md  overflow-hidden flex justify-center items-center">
        <img
          src={
            product?.product_image
              ? product?.product_image
              : "https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
          }
          alt="Bag"
          className="w-full aspect-square object-contain mix-blend-multiply"
        />

        <div className="absolute top-2 left-2 badge badge-xs rounded-sm bg-dealbondhu text-white badge-accent font-medium">
          For You
        </div>
      </div>

      <div
        style={{
          boxShadow:
            "0 0 3px rgba(0, 0, 0, 0.2)",
        }}
        className="w-full rounded-md bg-white dark:bg-inherit my-2 dark:border-2 p-2"
      >
        <div className="badge badge-sm badge-soft badge-success  rounded-sm capitalize">
          {product?.category}
        </div>
        {/* product name  */}
        <p className="mt-1 line-clamp-1 text-sm font-semibold font-sans">
          {product?.title ? product.title : "Unknown"}
        </p>
        {/* price  */}
        <div className="">
          {/* <GiPriceTag /> */}
          <div className=" flex items-end gap-2 font-sans font-bold ">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 260 260"
                className="w-[18px] aspect-square text-dealbondhu"
              >
                <path d="M66.2 22c-8.4 2.2-22.8 9.4-24.3 12.1-.8 1.5 0 3.6 3.7 9.9 5 8.7 5 8.7 11.7 5.3C62 46.9 69 46.6 73 48.7c5.1 2.6 7.2 7.7 7.8 18.9l.5 9.4H70.9c-5.7 0-11 .4-11.7.8-.9.7-1.2 4.4-1 15.3l.3 14.4 11.3.3 11.2.3v51.2c0 56.1.3 59.2 5.8 67.2 4.7 6.8 15.8 11.5 31.5 13.4 14.4 1.7 34.3-2.4 49.2-10.2 10.7-5.6 24.5-19.2 29.7-29.2 7.5-14.6 10.4-30.4 7.9-42.8-2.8-13.4-12.5-26.4-23.5-31.6-19.3-9-42.5-2.6-51.4 14.3-2.4 4.5-2.7 6.2-2.7 15.1 0 8.4.4 10.7 2.2 14.1 9.9 18.5 38.1 19.1 47.6 1 1.4-2.8 2.1-6 2.1-10.3.1-7.1 1.4-7 4.2.2 2.4 6.5 1.6 16.5-2 23.8-3.3 6.9-12.2 16.8-18.1 20.3-10.6 6.2-28.6 9.8-37.1 7.5-2.3-.6-5.3-2.3-6.8-3.7l-2.6-2.7V108h113.1l-.3-15.3-.3-15.2-56.2-.3L117 77v-9.3c-.1-24.8-7.5-40.4-21.7-45.7-7-2.6-19.1-2.6-29.1 0" />
              </svg>{" "}
              <div className={` text-lg text-dealbondhu`}>
                {product?.offer_price ? product?.offer_price + ` ` : ""}
              </div>
              {/* ${translation[lan].common.taka} */}
            </div>
            <div className="text-sm h-fit w-fit line-through opacity-50 font-shiliguri">
              {product?.regular_price}
            </div>
          </div>

          {/* discount  */}
          <span className=" text-[12px] font-semibold text-red-600"></span>
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
              {/* import { IoHeartCircleOutline } from "react-icons/io5";
<IoHeartCircleOutline /> */}

{/* import { IoHeartCircle } from "react-icons/io5";
<IoHeartCircle /> */}
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
