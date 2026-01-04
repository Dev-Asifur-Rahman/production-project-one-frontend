"use client";

import getCategory from "@/actions/category/getCategory";
import { closeModal } from "@/redux/features/modalSlice";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";

const DealModal = () => {
  const isOpen = useSelector((state) => state.deal_modal.isOpen);
  const dispatch = useDispatch();
  const dialogueRef = useRef(null);
  const productInfoRef = useRef(null);
  const router = useRouter();
  const {lan} = useContext(LanguageContext)

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productInfo, setProductInfo] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const dialog = dialogueRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

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

  const submitDealForm = async (e) => {
    e.preventDefault();
    const target = e.target;

    const regularPrice = target.regular_price.value;
    const offerPrice = target.offer_price.value;
    const offerPercent = target.offer_percent.value;

    if (isNaN(regularPrice) || isNaN(offerPrice) || isNaN(offerPercent)) {
      return alert("Please enter numeric values.");
    }

    const response = await fetch("/api/cookies/get_user_id");
    const user_object = await response.json();

    const userId = user_object?.user_id;

    if (userId) {
      const product_object = {
        dealer_id : userId,
        title: target.title.value,
        company: target.company.value,
        regular_price: parseInt(regularPrice),
        offer_price: parseInt(offerPrice),
        offer_percent: parseInt(offerPercent),
        expired_at: startDate,
        product_info: productInfo,
        product_link: target.product_link.value,
        product_image: target.product_image.value,
        category: target.category.value.toLowerCase(),
        subcategory: target.subcategory.value.toLowerCase(),
        status: "pending",
      };
      const promise = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_pending_product`,
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
            router.refresh();
            dispatch(closeModal());
            e.target.reset();
            return "Deal Submitted Successfully";
          }
          throw new Error("Failed !");
        },
        error: "Insert failed",
      });
    }
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
              <legend className="fieldset-legend">{translation[lan].common.title}</legend>
              <input required type="text" name="title" className="input" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.category}</legend>
              <select
                required
                name="category"
                defaultValue=""
                className="select w-full"
                onChange={handleCategoryChange}
              >
                <option disabled value="">
                  {translation[lan].common.choose_category}
                </option>

                {categories?.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.subcategory}</legend>
              <select
                required
                name="subcategory"
                defaultValue=""
                className="select w-full"
                disabled={!selectedCategory}
              >
                <option disabled value="">
                  {translation[lan].common.choose_category}
                </option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.company}</legend>
              <input required type="text" name="company" className="input" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.regular_price}</legend>
              <input
                required
                type="number"
                name="regular_price"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.offer_price}</legend>
              <input
                required
                type="number"
                name="offer_price"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.offer_percent}</legend>
              <input
                required
                type="number"
                name="offer_percent"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.set_expire_date}</legend>
              <DatePicker
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeIntervals={5}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText="Select date & time"
                className="input input-bordered w-full"
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">{translation[lan].common.product_info}</legend>

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
                    nodesToRemove.forEach((el) =>
                      el.replaceWith(...el.childNodes)
                    );
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
              <legend className="fieldset-legend">{translation[lan].common.product_link}</legend>
              <input
                required
                type="text"
                name="product_link"
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">{translation[lan].common.product_image}</legend>
              <input
                required
                type="text"
                name="product_image"
                className="input"
              />
            </fieldset>

            <div className="flex items-center justify-center gap-3 ">
              <button className="btn bg-[#006A4E] text-white">{translation[lan].common.submit}</button>
              <button
                type="button"
                onClick={() => dispatch(closeModal())}
                className="btn bg-[#F42A41] text-white"
              >
                {translation[lan].common.cancel}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DealModal;
