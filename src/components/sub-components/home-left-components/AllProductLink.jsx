"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const AllProductLink = ({ categoryName = "", Heading = "" }) => {
  const router = useRouter();
  const { lan } = useContext(LanguageContext) ;
  return (
    <div
      onClick={() => router.push(`/products/${categoryName}`)}
      className={`text-lg w-fit hover:underline cursor-pointer font-semibold smd:text-xl smd:font-bold mmd:text-2xl text-dealbondhu  ${lan === 'en' ? "font-sans": 'font-shiliguri'}`}
    >
      {Heading}
    </div>
  );
};

export default AllProductLink;
