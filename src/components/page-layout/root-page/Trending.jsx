"use client";

import { usePathname, useRouter } from "next/navigation";

const Trending = () => {
  const router = useRouter();
  const pathname = usePathname();
  const categories = [
    "Electronics",
    "Fashion",
    "Beauty & Care",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Baby & Kids",
    "Automotive",
    "Groceries",
    "Office & Books",
  ];

  return (
    pathname === "/" && (
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
    )
  );
};

export default Trending;
