"use client";
import getCategory from "@/actions/category/getCategory";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


const ExistingProductUpdateForm = ({ product }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productInfo, setProductInfo] = useState(product?.product_info || "");

  const productInfoRef = useRef(null);

  useEffect(() => {
    if (productInfoRef.current && product?.product_info) {
      productInfoRef.current.innerHTML = product.product_info;
    }
  }, [product]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    const foundCategory = categories?.find((cat) => cat.name === value);
    setSubcategories(foundCategory ? foundCategory.subcategories : []);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.target;

    const regularPrice = target.regular_price.value;
    const offerPrice = target.offer_price.value;
    const offerPercent = target.offer_percent.value;

    if (isNaN(regularPrice) || isNaN(offerPrice) || isNaN(offerPercent)) {
      return alert("Please enter numeric values.");
    }

    const product_object = {
      title: target.title.value,
      company: target.company.value,
      regular_price: parseInt(regularPrice),
      offer_price: parseInt(offerPrice),
      offer_percent: parseInt(offerPercent),
      validation: parseInt(target.validation.value),
      product_info: productInfo,
      product_link: target.product_link.value,
      product_image: target.product_image.value,
      category: target.category.value.toLowerCase(),
      subcategory: target.subcategory.value.toLowerCase(),
      status: "pending",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/update_existing_product/${product?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product_object),
      }
    );

    const result = await response.json();
    if (result.acknowledged === true) {
      toast.success("Updated");
      return;
    } else {
      toast.error("Failed! Try Again");
    }
  };
  return (
    <div>
      <form
        id="deal_form"
        onSubmit={handleForm}
        method="dialog"
        className="grid grid-cols-1 lg:grid-cols-2 place-items-center w-full my-10"
      >
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Title</legend>
          <input
            defaultValue={product?.title}
            required
            type="text"
            name="title"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Category</legend>
          <select
            required
            name="category"
            defaultValue={product?.category}
            className="select w-full"
            onChange={handleCategoryChange}
          >
            <option disabled value={product?.category}>
              {product?.category}
            </option>

            {categories?.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Sub Category</legend>
          <select
            required
            name="subcategory"
            defaultValue={product?.subcategory}
            className="select w-full"
            disabled={!selectedCategory}
          >
            <option disabled value={product?.subcategory}>
              {product?.subcategory}
            </option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Company</legend>
          <input
            defaultValue={product?.company}
            required
            type="text"
            name="company"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Regular Price</legend>
          <input
            required
            defaultValue={product?.regular_price}
            type="number"
            name="regular_price"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Offer Price</legend>
          <input
            defaultValue={product?.offer_price}
            required
            type="number"
            name="offer_price"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Offer Percent</legend>
          <input
            required
            defaultValue={product?.offer_percent}
            type="number"
            name="offer_percent"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Validation</legend>
          <input
            required
            defaultValue={product?.validation}
            type="number"
            name="validation"
            className="input"
            placeholder="Enter Days"
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Product Info</legend>

          <div
            contentEditable
            ref={productInfoRef}
            onInput={(e) => setProductInfo(e.currentTarget.innerHTML)}
            onPaste={(e) => {
              e.preventDefault();

              // Get clipboard HTML and plain text
              const html = e.clipboardData.getData("text/html");
              const text = e.clipboardData.getData("text/plain");

              let cleanHTML = "";

              if (html) {
                // Parse HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Keep only allowed tags
                const allowedTags = ["UL", "OL", "LI", "P", "BR", "SPAN"];
                const walker = document.createTreeWalker(
                  doc.body,
                  NodeFilter.SHOW_ELEMENT,
                  null,
                  false
                );
                const nodesToRemove = [];
                while (walker.nextNode()) {
                  const el = walker.currentNode;
                  if (!allowedTags.includes(el.tagName)) {
                    nodesToRemove.push(el);
                  } else {
                    el.removeAttribute("style");
                    el.removeAttribute("class");
                    el.removeAttribute("data-*");
                  }
                }
                nodesToRemove.forEach((el) => el.replaceWith(...el.childNodes));
                cleanHTML = doc.body.innerHTML;
              } else {
                // Fallback: plain text with line breaks
                cleanHTML = text.replace(/\n/g, "<br>");
              }

              document.execCommand("insertHTML", false, cleanHTML);
            }}
            className="input w-full min-h-20 p-2"
            style={{ whiteSpace: "pre-line", overflowY: "auto" }}
          ></div>

          <input type="hidden" name="product_info" value={productInfo} />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Product Link</legend>
          <input
            defaultValue={product?.product_link}
            required
            type="text"
            name="product_link"
            className="input"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Product Image</legend>
          <input
            defaultValue={product?.product_image}
            required
            type="text"
            name="product_image"
            className="input"
          />
        </fieldset>

        <div className="lg:col-span-2 mt-3">
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default ExistingProductUpdateForm;
