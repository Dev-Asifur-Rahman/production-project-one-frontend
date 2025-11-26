"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Marquee from "react-fast-marquee";

import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { GiClick } from "react-icons/gi";

const TopCategories = () => {
  const [isLiked, setLiked] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full mb-4">
      <p className="text-lg w-fit hover:underline cursor-pointer font-semibold pl-3 my-3 smd:text-xl smd:font-bold mmd:text-2xl">
        Top Categories
      </p>
      <Marquee pauseOnHover className="w-full flex items-center gap-3 ">
        {[...Array(10)].map((_, index) => (
          <div
            onClick={() => router.push(`/products/${"topcategories"}`)}
            key={index}
            className="flex items-center mx-4 w-[270px] cursor-pointer aspect-[1/0.4] p-2 rounded-md shadow-2xl  mb-10 hover:bg-[#d1e2f5]"
          >
            {/* image section  */}
            <div className="bg-[#F0F0F0] rounded-md w-2/5 h-full ">
              <img
                src="https://static.slickdealscdn.com/attachment/8/2/3/9/6/6/7/200x200/18696175.thumb"
                alt=""
                className="rounded-lg mix-blend-multiply"
              />
            </div>
            {/* details section  */}
            <div className="w-3/5 text-[12px] px-1.5 h-full flex flex-col justify-around">
              <p className="line-clamp-2">
                26" AMYET EB26 1500W Peak 48V 15AH Adult Electric Fat Tire Bike
              </p>
              <div className="flex items-center justify-between">
                <p className="flex gap-1 items-center">
                  <GiClick />
                  23,549
                </p>
                <div className="flex items-center gap-1">
                  {isLiked ? <FcLike /> : <FcLikePlaceholder />}
                  <span className="">23</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TopCategories;
