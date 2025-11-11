"use client";
import { IoTrendingUp } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useState } from "react";

const TrendingDeals = () => {
  const [isLiked, setLiked] = useState(false);
  return (
    <div className="w-full mx-auto smd:w-full mmd:w-full md:w-full lg:w-full  mt-10 ">
      <div
        style={{
          border: "1px solid #F0F0F0",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        className="bg-[#FAFAFA] flex justify-around smd:justify-start md:justify-around lg:justify-start items-center smd:gap-3 py-2 text-xl font-semibold"
      >
        <p>Trending Deals</p>
        <IoTrendingUp />
      </div>

      {/* product section  */}
      <section className="w-full border border-[#F0F0F0]">
        {/* fetch products here  */}

        {/* cards */}
        <div className="w-full p-2 flex border-b border-b-[#F0F0F0]">
          {/* img section  */}
          <div className="w-1/3 max-w-[100px] md:w-2/4 aspect-square bg-[#F0F0F0] rounded-lg">
            <img
              src="https://static.slickdealscdn.com/attachment/8/2/3/9/6/6/7/200x200/18696175.thumb"
              className="w-full h-full rounded-lg mix-blend-multiply"
              alt=""
            />
          </div>

          {/* description section  */}
          <div className="w-2/3  px-1 text-sm ">
            {/* product name  */}
            <p className="line-clamp-2">
              26" AMYET EB26 1500W Peak 48V 15AH Adult Electric Fat Tire Bike
            </p>

            {/* price  */}
            <div className="flex items-center gap-3 mt-2 font-medium">
              <GiPriceTag />
              <p>$39</p>
              {/* discount  */}
              <span className="line-through text-[12px] text-red-500">$45</span>
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

        <div className="w-full p-2 flex border-b border-b-[#F0F0F0]">
          {/* img section  */}
          <div className="w-1/3 max-w-[100px] md:w-2/4 aspect-square bg-[#F0F0F0] rounded-lg">
            <img
              src="https://static.slickdealscdn.com/attachment/8/2/3/9/6/6/7/200x200/18696175.thumb"
              className="w-full h-full rounded-lg mix-blend-multiply"
              alt=""
            />
          </div>

          {/* description section  */}
          <div className="w-2/3  px-1 text-sm ">
            {/* product name  */}
            <p className="line-clamp-2">
              26" AMYET EB26 1500W Peak 48V 15AH Adult Electric Fat Tire Bike
            </p>

            {/* price  */}
            <div className="flex items-center gap-3 mt-2 font-medium">
              <GiPriceTag />
              <p>$39</p>
              {/* discount  */}
              <span className="line-through text-[12px] text-red-500">$45</span>
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

        <div className="w-full p-2 flex border-b border-b-[#F0F0F0]">
          {/* img section  */}
          <div className="w-1/3 max-w-[100px] md:w-2/4 aspect-square bg-[#F0F0F0] rounded-lg">
            <img
              src="https://static.slickdealscdn.com/attachment/8/2/3/9/6/6/7/200x200/18696175.thumb"
              className="w-full h-full rounded-lg mix-blend-multiply"
              alt=""
            />
          </div>

          {/* description section  */}
          <div className="w-2/3  px-1 text-sm ">
            {/* product name  */}
            <p className="line-clamp-2">
              26" AMYET EB26 1500W Peak 48V 15AH Adult Electric Fat Tire Bike
            </p>

            {/* price  */}
            <div className="flex items-center gap-3 mt-2 font-medium">
              <GiPriceTag />
              <p>$39</p>
              {/* discount  */}
              <span className="line-through text-[12px] text-red-500">$45</span>
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
      </section>
    </div>
  );
};

export default TrendingDeals;
