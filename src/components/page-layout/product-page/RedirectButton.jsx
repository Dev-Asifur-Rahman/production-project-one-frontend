"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext } from "react";
import toast from "react-hot-toast";

const RedirectButton = ({ product_link, title, company, product, user_id }) => {
  const { lan } = useContext(LanguageContext);

  const intentScoreCalculatorFunction = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate_intent_score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: session,
          product_id: product?._id,
          dealer_id: product?.dealer_id,
          user_id: user_id,
          category: product?.category,
          subcategory: product?.subcategory,
          company: product?.company,
        }),
      },
    );
    const data = await res.json();
    return data;
  };

  const handleDirect = async (e) => {
    const click_document = {
      product_name: title,
      product_link: product_link,
      company,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post_track_info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(click_document),
      },
    );

    const result = await res.json();
    if (result.acknowledged === true) {
      intentScoreCalculatorFunction("visited");

      window.open(product_link, "blank");
    } else {
      return toast.error("internal error ! Try Again");
    }
  };

  return (
    <button
      onClick={handleDirect}
      className="btn rounded-xl bg-[#006A4E] text-white"
    >
      {lan === "bn"
        ? `${company} ${translation[lan].productDetailsPage.common.get_deal_at}`
        : `${translation[lan].productDetailsPage.common.get_deal_at} ${company}`}
    </button>
  );
};

export default RedirectButton;
