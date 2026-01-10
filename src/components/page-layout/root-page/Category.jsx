"use client";

import getCategory from "@/actions/category/getCategory";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategories(data);
    };
    fetchCategory();
  }, []);

  const handleCategoryNavigate = (category) => {
    router.push(`/products/${encodeURIComponent(category)}`);
  };
  const handleSubCategoryWithCategory = (e) => {};

  return (
    (pathname === "/" || pathname.startsWith("/products")) && (
      <section className="w-full">
        <div
          id="trending-component"
          className="w-full px-2 lg:flex lg:justify-center lg:items-center gap-6 relative hidden"
        >
          {categories?.map((category, index) => {
            return (
              <div
                onClick={() => handleCategoryNavigate(category?.name)}
                key={index}
                className="dropdown dropdown-hover  dropdown-center"
              >
                <div tabIndex={0} role="button" className=" m-1 ">
                  {category?.name}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu  rounded-box z-100 w-fit p-1 shadow-sm bg-white border-t-2"
                >
                  {category?.subcategories?.map((subcategory, index) => {
                    return (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/products/${encodeURIComponent(
                              category?.name
                            )}?subcategory=${encodeURIComponent(subcategory)}`,
                            { forceOptimisticNavigation: true }
                          );
                        }}
                        key={index}
                      >
                        <a className="text-nowrap">{subcategory}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
};

export default Category;
