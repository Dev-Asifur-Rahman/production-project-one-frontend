"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useContext } from "react";

const AllProductLink = ({ categoryName = "", Heading = "" }) => {
  const { lan } = useContext(LanguageContext);
  return (
    <div
      className={`text-lg w-fit font-semibold smd:text-xl smd:font-bold mmd:text-2xl text-dealbondhu  ${lan === "en" ? "font-sans" : "font-shiliguri"}`}
    >
      {Heading}
    </div>
  );
};

export default AllProductLink;
