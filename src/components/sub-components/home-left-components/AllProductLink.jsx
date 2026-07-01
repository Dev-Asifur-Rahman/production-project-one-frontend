"use client";

import { useRouter } from "next/navigation";

const AllProductLink = ({ categoryName = "", Heading = "" }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${categoryName}`)}
      className="text-lg w-fit hover:underline cursor-pointer font-semibold smd:text-xl smd:font-bold mmd:text-2xl text-dealbondhu"
    >
      {Heading}
    </div>
  );
};

export default AllProductLink;
