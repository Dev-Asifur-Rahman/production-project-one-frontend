"use client";

import { closeModal } from "@/redux/features/modalSlice";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

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

const DealModal = () => {
  const isOpen = useSelector((state) => state.deal_modal.isOpen);
  const dispatch = useDispatch();
  const dialogueRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const dialog = dialogueRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    const foundCategory = categories.find((cat) => cat.name === value);
    setSubcategories(foundCategory ? foundCategory.subcategories : []);
  };

  const submitDealForm = async (e) => {
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
      company: target.company.value.toLowerCase(),
      regular_price: parseInt(regularPrice),
      offer_price: parseInt(offerPrice),
      offer_percent: parseInt(offerPercent),
      product_info: target.product_info.value,
      product_link: target.product_link.value,
      product_image: target.product_image.value,

      category: target.category.value.toLowerCase(),
      subcategory: target.subcategory.value.toLowerCase(),
    };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/upload_product`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product_object),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    });

    toast.promise(promise, {
      loading: "Uploading Deal",
      success: (result) => {
        if (result?.acknowledged === true) {
          dispatch(closeModal());
          e.target.reset();
          return "Deal Added Successfully";
        }
        throw new Error("Failed !");
      },
      error: "Insert failed",
    });
  };

  return (
    <>
      <dialog
        ref={dialogueRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        onClick={(e) => {
          if (e.target === dialogueRef.current) {
            dispatch(closeModal());
          }
        }}
      >
        <div className="modal-box p-3">
          <form
            id="deal_form"
            onSubmit={submitDealForm}
            method="dialog"
            className="flex flex-col items-center gap-3"
          >
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input required type="text" name="title" className="input" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <select
                required
                name="category"
                defaultValue=""
                className="select w-full"
                onChange={handleCategoryChange}
              >
                <option disabled value="">
                  Choose Category
                </option>

                {categories.map((cat) => (
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
                defaultValue=""
                className="select w-full"
                disabled={!selectedCategory}
              >
                <option disabled value="">
                  Choose Subcategory
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
              <input required type="text" name="company" className="input" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regular Price</legend>
              <input
                required
                type="number"
                name="regular_price"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Offer Price</legend>
              <input
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
                type="number"
                name="offer_percent"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Info</legend>
              <input
                required
                type="text"
                name="product_info"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Link</legend>
              <input
                required
                type="text"
                name="product_link"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Image</legend>
              <input
                required
                type="text"
                name="product_image"
                className="input"
              />
            </fieldset>

            <div className="flex items-center justify-center gap-3">
              <button className="btn">Submit</button>
              <button
                type="button"
                onClick={() => dispatch(closeModal())}
                className="btn"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DealModal;
