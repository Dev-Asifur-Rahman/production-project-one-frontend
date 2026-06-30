"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

export default function ToggleLanguageIcon() {
  const { lan, setLan } = useContext(LanguageContext);
  const router = useRouter();

  const angle = useRef(0);
  const arrowsRef = useRef(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";

    setLan(savedLang);
    document.documentElement.setAttribute("data-lang", savedLang);

    angle.current = savedLang === "bn" ? 180 : 0;

    if (arrowsRef.current) {
      arrowsRef.current.style.transform = `rotate(${angle.current}deg)`;
    }
  }, [setLan]);

  const handleToggle = async () => {
    // Arrow Rotate
    angle.current += 180;

    if (arrowsRef.current) {
      arrowsRef.current.style.transform = `rotate(${angle.current}deg)`;
    }

    // Language Toggle
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
    <section
      onClick={handleToggle}
      className="tooltip before:bg-[#006A4E] before:border before:text-white cursor-pointer relative hidden md:inline-flex" data-tip={lan === 'en' ? 'Language' : 'ভাষা'}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 119 123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <g
          ref={arrowsRef}
          style={{
            transformOrigin: "59.5px 61.5px",
            transition: "transform 0.5s ease",
          }}
        >
          <path
            d="M3.15995 84.0036L4.76837e-07 95.8364L11.8328 98.9964L14.9927 87.1636L3.15995 84.0036ZM59.4694 121.5V123C82.235 123 102.11 110.63 112.741 92.2511L111.443 91.5L110.144 90.7489C100.027 108.239 81.1208 120 59.4694 120V121.5ZM7.49637 91.5L6.19796 92.2511C16.8293 110.63 36.7039 123 59.4694 123V121.5V120C37.8181 120 18.912 108.239 8.79478 90.7489L7.49637 91.5Z"
            fill="#FFFDFD"
          />

          <path
            d="M115.779 38.9964L118.939 27.1636L107.106 24.0036L103.946 35.8364L115.779 38.9964ZM111.443 31.5L112.741 30.7489C102.11 12.3704 82.235 0 59.4694 0V1.5V3C81.1208 3 100.027 14.7615 110.144 32.2511L111.443 31.5ZM59.4694 1.5V0C36.7039 0 16.8293 12.3704 6.19796 30.7489L7.49637 31.5L8.79478 32.2511C18.912 14.7615 37.8181 3 59.4694 3V1.5Z"
            fill="#FFFDFD"
          />

          <circle
            cx="59.4964"
            cy="61.5"
            r="48.5"
            fill="#FFFFFF"
            // stroke="#FFFDFD"
            strokeWidth="3"
          />
        </g>
      </svg>

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          text-[#006A4E]
          text-sm
          font-semibold
          pointer-events-none
          select-none
        "
      >
        {lan === "en" ? "EN" : "বাং"}
      </div>
    </section>
  );
}
