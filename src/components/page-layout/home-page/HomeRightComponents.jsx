"use client";
import RightComponentProductCard from "@/components/sub-components/home-right-components/RightComponentProductCard";
import { useEffect, useState } from "react";
const HomeRightComponents = ({
  componentName,
  Heading = "Enter Heading",
  HeadingIcon,
}) => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    if (componentName === "popular-deals") {
      fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}
/popular_deals`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [componentName]);
  return (
    <div
      className={`w-full ${componentName === "trending-deals" && "mt-10"}
       mx-auto smd:w-full mmd:w-full md:w-full lg:w-full`}
    >
      <div
        style={{
          border: "1px solid #F0F0F0",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        className="bg-[#FAFAFA] flex justify-around smd:justify-start md:justify-around lg:justify-start items-center smd:gap-3 py-2 text-xl font-semibold"
      >
        <p className="px-2">{Heading}</p>
        {HeadingIcon}
      </div>

      {/* product section  */}
      <section className="w-full border border-t-0 border-[#F0F0F0]">
        {/* fetch products here  */}

        {/* cards */}
        {products?.map((product, index) => {
          return (
            <RightComponentProductCard
              product={product}
              key={index}
            ></RightComponentProductCard>
          );
        })}
      </section>
    </div>
  );
};

export default HomeRightComponents;
