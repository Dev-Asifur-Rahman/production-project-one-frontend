"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { category_list } from "@/data/categories";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const Category = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { lan } = useContext(LanguageContext);


  const handleCategoryNavigate = (category) => {
    router.push(`/products/${encodeURIComponent(category)}`);
  };


  return (
    (pathname === "/" || pathname.startsWith("/products")) && (
      <section className="w-full">
        <div
          id="trending-component"
          className="w-full px-2 lg:flex lg:justify-center lg:items-center gap-6 relative hidden"
        >
          {category_list?.map((cat, index) => {
            return (
              <div
                onClick={() => handleCategoryNavigate(cat?.category?.name)}
                key={index}
                className="dropdown dropdown-hover  dropdown-center"
              >
                <div tabIndex={0} role="button" className=" m-1 ">
                  {lan === "bn" ? cat?.category?.bn : cat?.category?.name}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu  rounded-box z-100 w-fit p-1 shadow-sm bg-white border-t-2"
                >
                  {cat?.subcategories?.map((subcategory, index) => {
                    return (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/products/${encodeURIComponent(
                              cat?.name
                            )}?subcategory=${encodeURIComponent(
                              subcategory?.name
                            )}`,
                            { forceOptimisticNavigation: true }
                          );
                        }}
                        key={index}
                      >
                        <a className="text-nowrap">
                          {lan === "bn"
                            ? subcategory?.bn
                            : subcategory?.en}
                        </a>
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
