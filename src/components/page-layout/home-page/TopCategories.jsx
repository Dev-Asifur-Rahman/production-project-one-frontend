"use client";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";

const TopCategories = () => {
  const router = useRouter();
  return (
    <div className="w-full mb-4">
      <p className="text-lg w-fit hover:underline cursor-pointer font-semibold pl-3 my-3 smd:text-xl smd:font-bold mmd:text-2xl">
        Top Categories
      </p>
      <Marquee pauseOnHover className="w-full flex items-center gap-3">
        {[...Array(10)].map((_, index) => (
          <div
            onClick={() => router.push(`/products/${"topcategories"}`)}
            key={index}
            className="border mx-4 w-[270px] cursor-pointer aspect-[1/0.6]"
          ></div>
        ))}
      </Marquee>
    </div>
  );
};

export default TopCategories;
