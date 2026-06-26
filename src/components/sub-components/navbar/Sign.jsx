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
      className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded"
    >
      {data ? <FaUserCircle /> : <PiSignInBold />}

      <p className="text-[#1A1A1A]">
        {!data
          ? translation[lan]?.navbar?.logo?.[2]
          : translation[lan]?.navbar?.logo?.[3]}
      </p>
    </div>
  );
};

export default Sign;
