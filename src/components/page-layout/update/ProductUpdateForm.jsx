"use client";
import getCategory from "@/actions/category/getCategory";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductUpdateForm = ({ product }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // start empty
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // start empty
  const [subcategories, setSubcategories] = useState([]);
  const [productInfo, setProductInfo] = useState(product?.product_info || "");
  const [archiveDate, setArchiveDate] = useState(
    product?.archive_at ? new Date(product.archive_at) : null
  );

  const productInfoRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productInfoRef.current && product?.product_info) {
      productInfoRef.current.innerHTML = product.product_info;
    }
  }, [product]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedSubcategory(""); // clear subcategory when category changes

    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === value.toLowerCase()
    );
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
      product_info: productInfo,
      product_link: target.product_link.value,
      product_image: target.product_image.value,
      category: selectedCategory.toLowerCase(),
      subcategory: selectedSubcategory.toLowerCase(),
      archive_at: archiveDate || null,
      status: "pending",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update_pending_product/${product?._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product_object),
        }
      );

      const result = await response.json();
      if (result.acknowledged) toast.success("Updated");
      else toast.error("Failed! Try Again");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <form
        id="deal_form"
        onSubmit={handleForm}
        className="grid grid-cols-1 lg:grid-cols-2 place-items-center w-full my-10 gap-4"
      >
        {/* Title */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            defaultValue={product?.title}
            required
            type="text"
            name="title"
            className="input"
          />
        </fieldset>

        {/* Category */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Category ({product?.category || "N/A"})
          </legend>
          <select
            required
            value={selectedCategory}
            className="select w-full"
            onChange={handleCategoryChange}
          >
            <option disabled value="">
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Subcategory */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Sub Category ({product?.subcategory || "N/A"})
          </legend>
          <select
            required
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="select w-full"
            disabled={!selectedCategory}
          >
            <option disabled value="">
              Select Subcategory
            </option>
            {subcategories.map((sub) => (
              <option key={sub.name} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Company */}
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

        {/* Prices */}
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
            required
            defaultValue={product?.offer_price}
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

        {/* Archive Date */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Archive Date</legend>
          <DatePicker
            required
            selected={archiveDate}
            onChange={(date) => setArchiveDate(date)}
            showTimeSelect
            timeIntervals={5}
            dateFormat="yyyy-MM-dd HH:mm"
            className="input w-full"
          />
        </fieldset>

        {/* Product Info */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Product Info</legend>
          <div
            contentEditable
            ref={productInfoRef}
            onInput={(e) => setProductInfo(e.currentTarget.innerHTML)}
            onPaste={(e) => {
              e.preventDefault();
              const html = e.clipboardData.getData("text/html");
              const text = e.clipboardData.getData("text/plain");
              let cleanHTML = "";

              if (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
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
                  if (!allowedTags.includes(el.tagName)) nodesToRemove.push(el);
                  else {
                    el.removeAttribute("style");
                    el.removeAttribute("class");
                    el.removeAttribute("data-*");
                  }
                }
                nodesToRemove.forEach((el) => el.replaceWith(...el.childNodes));
                cleanHTML = doc.body.innerHTML;
              } else cleanHTML = text.replace(/\n/g, "<br>");

              document.execCommand("insertHTML", false, cleanHTML);
            }}
            className="input w-full min-h-20 p-2"
            style={{ whiteSpace: "pre-line", overflowY: "auto" }}
          ></div>
          <input type="hidden" name="product_info" value={productInfo} />
        </fieldset>

        {/* Product Link */}
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

        {/* Product Image */}
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

export default ProductUpdateForm;
