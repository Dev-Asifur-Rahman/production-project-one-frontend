"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useContext, useEffect } from "react";

const AllProductLink = ({ categoryName = "", Heading = "", length }) => {
  const { lan } = useContext(LanguageContext);

  useEffect(() => {
  }, [length]);

  return (
    length !== 0 && (
      <div
        className={`text-lg w-fit font-semibold smd:text-xl smd:font-bold mmd:text-2xl text-dealbondhu  ${lan === "en" ? "font-sans" : "font-shiliguri"} uppercase`}
      >
        {Heading}
      </div>
    )
  );
};

export default AllProductLink;
