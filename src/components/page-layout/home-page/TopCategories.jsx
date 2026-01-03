"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const {lan} = useContext(LanguageContext)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}
/trending_categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <div className="w-full mb-4">
      <p className="text-lg w-fit hover:underline cursor-pointer font-semibold pl-3 my-3 smd:text-xl smd:font-bold mmd:text-2xl">
        {translation[lan].homeLeftComponent.heading.top_categories}
      </p>
      <Marquee pauseOnHover className="w-full flex items-center gap-3 ">
        {categories?.map((category, index) => (
          <div
            onClick={() => router.push(`/products/${category?.category}`)}
            key={index}
            className="flex flex-col justify-center items-center gap-3 mx-8 w-50  cursor-pointer  p-2    mb-10 "
          >
            <p
              className={`font-bold text-lg ${
                index + 1 === 1
                  ? "text-yellow-500"
                  : index + 1 === 2
                  ? "text-gray-400"
                  : index + 1 === 3
                  ? "text-amber-700"
                  : ""
              }`}
            >
              {index + 1}
              <span className={``}>
                {index + 1 === 1
                  ? "st"
                  : index + 1 === 2
                  ? "nd"
                  : index + 1 === 3
                  ? "rd"
                  : "th"}
              </span>
            </p>
            <div className="w-[120px] aspect-square rounded-full shadow-2xl hover:bg-[#d1e2f5]"></div>
            <p className="text-wrap text-center w-full">
              {category?.category}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TopCategories;
