"use client";

import { useRouter } from "next/navigation";

const Trending = () => {
  const router = useRouter();
  const categories = [
    "Trending",
    "Top Retail Deals",
    "Tool Deals",
    "Tech Deals",
    "Apparel",
    "Credit Card Offers",
    "Laptop and Computers",
    "Home Deals",
    "Sneaker Deals",
    "Grocery Deals",
  ];

  return (
    <div
      id="trending-component"
      className="w-full shadow-xl p-2 flex lg:justify-center md:justify-start justify-start  items-center gap-6 overflow-x-scroll scrollbar-hidden"
    >
      {categories.map((category, index) => (
        <div
          onClick={() => {
            router.push(`/products/${category}`);
          }}
          key={index}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Trending;
