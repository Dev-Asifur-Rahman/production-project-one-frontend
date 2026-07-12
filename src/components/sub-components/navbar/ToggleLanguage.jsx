"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ToggleLanguage = () => {
  const { lan, setLan } = useContext(LanguageContext);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";

    setLan(savedLang);
    document.documentElement.setAttribute("data-lang", savedLang);
  }, [setLan]);

  const handleToggle = async () => {
    const newLang = lan === "en" ? "bn" : "en";

    setLan(newLang);

    document.documentElement.setAttribute("data-lang", newLang);

    localStorage.setItem("lang", newLang);

    await fetch("/api/cookies/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: newLang,
      }),
    });

    router.refresh();
  };

  return (
    <div
      onClick={handleToggle}
      className="
     relative
     hidden lg:flex
     items-center
     justify-center
     w-24
     h-24
     cursor-pointer
     select-none
   "
    >
      {/* Rotating Arrow */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className={`
      absolute
      transition-transform
      duration-700
      ease-in-out
      ${lan === "bn" ? "rotate-180" : ""}
    `}
      >
        {/* Top curved arrow */}
        <path
          d="
        M22 32
        C28 12, 72 12, 78 38
      "
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Top arrow head */}
        <path
          d="
        M78 38
        L68 34
        L74 45
      "
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom curved arrow */}
        <path
          d="
        M78 68
        C72 88, 28 88, 22 62
      "
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Bottom arrow head */}
        <path
          d="
        M22 62
        L32 66
        L26 55
      "
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Center Circle */}
      <div
        className="
      relative
      w-12
      h-12
      rounded-full
      border-2
      border-white
      bg-black/30
      backdrop-blur-md
      flex
      items-center
      justify-center
      text-white
      font-semibold
      text-sm
      transition-all
      duration-300
      hover:scale-110
    "
      >
        {lan === "en" ? "EN" : "বাং"}
      </div>
    </div>
  );
};

export default ToggleLanguage;
