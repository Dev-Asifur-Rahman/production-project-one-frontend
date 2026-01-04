"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext } from "react";
import toast from "react-hot-toast";

const RedirectButton = ({ product_link, title, company }) => {
  const {lan} = useContext(LanguageContext)
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
      }
    );

    const result = await res.json();
    if (result.acknowledged === true) {
      window.open(product_link, "blank");
    } else {
      return toast.error("internal error ! Try Again");
    }
  };
  return (
    <button
      onClick={handleDirect}
      // style={{
      //   background: `linear-gradient(21deg,rgba(123, 97, 207, 1) 0%, rgba(89, 101, 194, 1) 34%, rgba(86, 127, 196, 1) 59%, rgba(102, 158, 222, 1) 71%, rgba(255, 255, 255, 1) 98%)`,
      // }}
      className="btn rounded-xl bg-[#006A4E] text-white"
    >
      { lan === 'bn' ? `${company} ${translation[lan].productDetailsPage.common.get_deal_at}`: `${translation[lan].productDetailsPage.common.get_deal_at} ${company}`}
    </button>
  );
};

export default RedirectButton;
