"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { CiSaveDown2 } from "react-icons/ci";

const SavedItems = () => {
  const router = useRouter();
  const session = useSession();
  const {lan} = useContext(LanguageContext)

  const handleRoute = () => {
    router.push("/saved_products");
  };
  return (
    session?.data?.user && (
      <div onClick={handleRoute} className=" bg-[#F42A41]  ">
        <CiSaveDown2 />
        <p className="">{translation[lan].navbar.logo[0]}</p>
      </div>
    )
  );
};

export default SavedItems;
