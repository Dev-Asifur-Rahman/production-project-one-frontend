"use client";

import getCategory from "@/actions/category/getCategory";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  const handleCategory = async (category) => {
    if (!category || !category.trim()) {
      return toast.error("Enter valid Category");
    } else {
      const value = category.trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_category_subcategory?category=${encodeURIComponent(
          value
        )}&subcategory=`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        categoryRef.current.value = ''
        setRefresh(!refresh);
        toast.success(data.message);
      }
    }
  };

  const handleSubcategory = async (category, subcategory) => {
    if (!category || !subcategory || !subcategory.trim()) {
      return toast.error("Enter valid Subcategory");
    } else {
      const value = subcategory.trim();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_category_subcategory?category=${encodeURIComponent(
          category
        )}&subcategory=${encodeURIComponent(value)}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        subCategoryRef.current.value = ''
        setRefresh(!refresh);
        toast.success(data.message);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_category/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.acknowledged === true) {
      toast.success("Category Deleted");
      setRefresh(!refresh);
      return;
    }
  };

  const handleDeleteSubCategory = async (categoryId, subcategoryName) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_subcategory/${categoryId}?subcategory=${encodeURIComponent(
        subcategoryName
      )}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    if (result.acknowledged === true) {
      setRefresh(prev => !prev)
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
          Open drawer
        </label>

        <h2 className="text-lg font-bold mb-2">
          {activeCategoryObj?.name || "Select Category"}
        </h2>
        <ul className="space-y-2">
          {activeCategoryObj?.subcategories?.map((sub, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">
              <div className="flex items-center justify-between">
                <p>{sub}</p>
                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    handleDeleteSubCategory(activeCategoryObj?._id, sub)
                  }
                >
                  <GoTrash />
                </div>
              </div>
            </li>
          ))}
          <div className="flex flex-col gap-3 items-start mt-4">
            <input
              ref={subCategoryRef}
              type="text"
              className="input"
              placeholder={activeCategoryObj?.name}
            />
            <button
              onClick={() => {
                handleSubcategory(
                  activeCategoryObj?.name,
                  subCategoryRef.current.value
                );
              }}
              className="btn btn-md px-10"
            >
              Add
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
                  {category.name}
                </button>
                <div onClick={() => handleDeleteCategory(category?._id)}>
                  <GoTrash />
                </div>
              </div>
            </li>
          ))}

          <div className="flex flex-col gap-3 items-start">
            <input
              ref={categoryRef}
              type="text"
              className="input"
              placeholder="add category"
            />
            <button
              onClick={() => {
                handleCategory(categoryRef.current.value);
              }}
              className="btn btn-md px-10"
            >
              Add
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
