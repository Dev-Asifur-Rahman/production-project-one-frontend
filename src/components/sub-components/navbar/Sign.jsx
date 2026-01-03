"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { HiUserCircle } from "react-icons/hi2";

const Sign = () => {
  const session = useSession();
  const router = useRouter();
  const {lan} = useContext(LanguageContext)
  const handleLogin = async() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    } else {
      await signOut({ redirect: false });
      router.push('/')
    }
  };
  return (
    <div onClick={handleLogin} className=" bg-[#196296] hover:bg-[#0ef]">
      <HiUserCircle />
      <p className="text-[#1A1A1A]">
        {session.status == "unauthenticated" ? translation[lan].navbar.logo[2] : translation[lan].navbar.logo[3]}
      </p>
    </div>
  );
};

export default Sign;
