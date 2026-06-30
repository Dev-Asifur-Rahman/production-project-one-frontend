"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";

const Sign = () => {
  const { data } = useSession();
  const router = useRouter();
  const { lan } = useContext(LanguageContext);

  const handleLogin = async () => {
    if (!data) {
      router.push("/auth/login");
    } else {
      await signOut({ redirect: false });
      router.push("/");
    }
  };

  return (
    <div
      onClick={handleLogin}
      className="tooltip tooltip-left before:bg-[#006A4E] before:border before:text-white flex items-center gap-2 cursor-pointer px-3 py-2 rounded"
      data-tip={
        data
          ? lan === "en"
            ? "Sign Out"
            : "সাইন আউট"
          : lan === "en"
            ? "Sign In"
            : "সাইন ইন"
      }
    >
      {data ? <FaUserCircle /> : <PiSignInBold />}
    </div>
  );
};

export default Sign;
