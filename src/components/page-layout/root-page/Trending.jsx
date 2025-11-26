"use client";

import { useRouter } from "next/navigation";

const Trending = () => {
  const router = useRouter();
  const categories = [
    "Trending",
    "Electronics & Gadgets",
    "Fashion & Apparel",
    "Health, Beauty & Personal Care",
    "Home & Kitchen",
    "Sports, Fitness & Outdoors",
    "Toys, Kids & Baby Products",
    "Automotive & Tools",
    "Groceries & Gourmet Food",
    "Office, Books & Entertainment",
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
