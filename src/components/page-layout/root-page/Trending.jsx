"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Trending = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isDivHovered, setIsDivHovered] = useState(false);

  const categories = [
    {
      name: "Electronics",
      subcategories: [
        "Mobile Phones & Accessories",
        "Computers & Laptops",
        "Cameras & Photography",
        "TVs & Home Entertainment",
        "Smart Home Devices",
        "Gaming Consoles & Accessories",
      ],
    },
    {
      name: "Fashion",
      subcategories: [
        "Men’s Clothing",
        "Women’s Clothing",
        "Kids’ Clothing",
        "Shoes & Footwear",
        "Watches & Jewelry",
        "Bags & Accessories",
      ],
    },
    {
      name: "Beauty & Care",
      subcategories: [
        "Skincare & Makeup",
        "Hair Care",
        "Health Supplements",
        "Grooming & Personal Hygiene",
      ],
    },
    {
      name: "Home & Kitchen",
      subcategories: [
        "Furniture & Home Decor",
        "Bedding & Bath",
        "Kitchen Appliances",
        "Cookware & Utensils",
      ],
    },
    {
      name: "Sports & Outdoors",
      subcategories: [
        "Exercise & Fitness Equipment",
        "Outdoor Gear & Camping",
        "Cycling & Running",
        "Sports Apparel & Accessories",
      ],
    },
    {
      name: "Baby & Kids",
      subcategories: [
        "Toys & Games",
        "Baby Care Products",
        "Kids’ Clothing & Accessories",
        "Educational Toys",
      ],
    },
    {
      name: "Automotive",
      subcategories: [
        "Car Accessories & Parts",
        "Tools & DIY Equipment",
        "Motorcycle Accessories",
      ],
    },
    {
      name: "Groceries",
      subcategories: [
        "Packaged Food & Snacks",
        "Beverages",
        "Organic & Health Foods",
      ],
    },
    {
      name: "Office & Books",
      subcategories: [
        "Books, Music & Movies",
        "Office & School Supplies",
        "Stationery & Art Supplies",
      ],
    },
  ];

  // show div only if name or div is hovered
  const showDiv = isNameHovered || isDivHovered;

  const handleMouseLeaveName = () => {
    setIsNameHovered(false);
    // only reset hoveredIndex if div also not hovered
    if (!isDivHovered) setHoveredIndex(null);
  };

  const handleMouseLeaveDiv = () => {
    setIsDivHovered(false);
    // only reset hoveredIndex if name also not hovered
    if (!isNameHovered) setHoveredIndex(null);
  };

  return (
    pathname === "/" && (
      <section className="w-full relative">
        <div
          id="trending-component"
          className="w-full shadow-xl px-2 flex lg:justify-center md:justify-start justify-start items-center gap-6 overflow-x-scroll scrollbar-hidden"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => router.push(`/products/${category.name}`)}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setIsNameHovered(true);
              }}
              onMouseLeave={handleMouseLeaveName}
              className="cursor-pointer py-1"
            >
              {category.name}
            </div>
          ))}
        </div>

        {showDiv && hoveredIndex !== null && (
          <div
            onMouseEnter={() => setIsDivHovered(true)}
            onMouseLeave={handleMouseLeaveDiv}
            className="absolute top-full z-50 bg-base-100 w-full  font-bold p-4 gap-1 place-items-start"
          >
            <div className="w-[80%] mx-auto grid grid-cols-2 gap-y-3">
              {categories[hoveredIndex].subcategories.map((sub, i) => (
                <p key={i} className="text-sm font-semibold">
                  {sub}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>
    )
  );
};

export default Trending;
