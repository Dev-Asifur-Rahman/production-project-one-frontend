"use client";

import getCategory from "@/actions/category/getCategory";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const { lan } = useContext(LanguageContext);

  const categoryRef = useRef(null);
  const categoryBanglaRef = useRef(null);
  const subCategoryRef = useRef(null);
  const subCategoryBanglaRef = useRef(null);

  const handleCategory = async (category, category_bn) => {
    if (!category || !category_bn || !category.trim() || !category_bn.trim()) {
      return toast.error("fill all the fields");
    } else {
      const name = category.trim();
      const bn = category_bn.trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_category_subcategory?type=category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            bn: bn,
            subcategories: [],
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        categoryRef.current.value = "";
        categoryBanglaRef.current.value = ""
        setRefresh(!refresh);
        toast.success(data.message);
      }
    }
  };

  const handleSubcategory = async (category, subcategory, subcategory_bn) => {
    if (
      !category ||
      !subcategory ||
      !subcategory_bn ||
      !subcategory.trim() ||
      !subcategory_bn.trim()
    ) {
      return toast.error("Fill all the input fields");
    } else {
      const name = subcategory.trim();
      const bn = subcategory_bn.trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_category_subcategory?type=subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName : category,
            name: name,
            en: name,
            bn: bn,
            icon: "",
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        subCategoryRef.current.value = "";
        subCategoryBanglaRef.current.value = ""
        setRefresh(!refresh);
        toast.success(data.message);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_category/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    if (result.acknowledged === true) {
      toast.success("Category Deleted");
      setRefresh(!refresh);
      return;
    }
  };

  const handleDeleteSubCategory = async (categoryId, subcategoryName) => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/delete_subcategory/${categoryId}?subcategory=${encodeURIComponent(
        subcategoryName
      )}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    if (result.acknowledged === true) {
      setRefresh((prev) => !prev);
      toast.success(`${subcategoryName} deleted`);
    } else {
      toast.error("Failed Try Again");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      setCategories(data);
      if (data.length > 0 && !activeCategory) {
        setActiveCategory(data[0].name);
      }
    };
    fetchCategories();
  }, [refresh]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);

    const drawer = document.getElementById("my-drawer-5");
    if (drawer && window.innerWidth < 768) {
      drawer.checked = false;
    }
  };

  const activeCategoryObj = categories.find(
    (cat) => cat.name === activeCategory
  );

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col p-4 w-full">
        <label
          htmlFor="my-drawer-5"
          className="btn drawer-button md:hidden mb-4"
        >
          {translation[lan].dashboard.categories.menu.heading}
        </label>

        <h2 className="text-lg font-bold mb-2">
          {activeCategoryObj?.name || "Laoding"}
        </h2>
        <ul className="space-y-2">
          {activeCategoryObj?.subcategories?.map((sub, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 dark:bg-[#191E24] rounded"
            >
              <div className="flex items-center justify-between">
                <p>{lan === "bn" ? sub?.bn : sub?.en}</p>
                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    handleDeleteSubCategory(activeCategoryObj?._id, sub?.name)
                  }
                >
                  <GoTrash className="text-[#F42A41]" />
                </div>
              </div>
            </li>
          ))}
          <div className="flex flex-col gap-3 items-start mt-4">
            <input
              ref={subCategoryRef}
              type="text"
              className="input"
              placeholder={
                translation[lan].dashboard.categories.add_subcategory
              }
            />
            <input
              ref={subCategoryBanglaRef}
              type="text"
              className="input"
              placeholder={
                translation[lan].dashboard.categories.add_subcategory_bangla
              }
            />
            <label htmlFor="" className="label my-1">
              Upload Icon for Subcategory
            </label>
            <input
              required
              type="file"
              name="banner_image"
              className="file-input file-input-md"
            />
            <button
              onClick={() => {
                handleSubcategory(
                  activeCategoryObj?.name,
                  subCategoryRef.current.value,
                  subCategoryBanglaRef.current.value
                );
              }}
              className="btn btn-md px-10 bg-[#006A4E] text-white"
            >
              {translation[lan].common.add}
            </button>
          </div>
        </ul>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 w-80 p-4 space-y-2">
          {categories?.map((category) => (
            <li key={category.name} className="">
              <div
                className={`flex flex-row items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-[#E1E1E2] text-black"
                    : ""
                }`}
              >
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`w-full text-left px-2 py-1 rounded `}
                >
                  {lan === "bn" ? category.bn : category?.name}
                </button>
                <div onClick={() => handleDeleteCategory(category?._id)}>
                  <GoTrash className="text-[#F42A41]" />
                </div>
              </div>
            </li>
          ))}

          <div className="flex flex-col gap-3 items-start">
            <input
              ref={categoryRef}
              type="text"
              className="input"
              placeholder={translation[lan].dashboard.categories.add_category}
            />
            <input
              ref={categoryBanglaRef}
              type="text"
              className="input"
              placeholder={
                translation[lan].dashboard.categories.add_category_bangla
              }
            />
            <button
              onClick={() => {
                handleCategory(
                  categoryRef.current.value,
                  categoryBanglaRef.current.value
                );
              }}
              className="btn btn-md px-10 bg-[#006A4E] text-white"
            >
              {translation[lan].common.add}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
