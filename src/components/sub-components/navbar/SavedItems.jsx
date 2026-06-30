"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { TiHeartFullOutline } from "react-icons/ti";

const SavedItems = () => {
  const router = useRouter();
  const session = useSession();
  const {lan} = useContext(LanguageContext)

  const handleRoute = () => {
    router.push("/saved_products");
  };
  return (
    session?.data?.user && (
      <div onClick={handleRoute} className="tooltip before:bg-[#006A4E] before:border before:text-white" data-tip={lan === 'en' ? "Saved Items" : " সংরক্ষিত আইটেম"}>
        <TiHeartFullOutline />
      </div>
    )
  );
};

export default SavedItems;

