"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import Marquee from "react-fast-marquee";

const HeadingMarquee = () => {
  const { lan } = useContext(LanguageContext);
  const pathname = usePathname();
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/verify_reset_code") ||
    pathname.startsWith("/reset_new_password")
  ) {
    return;
  } else {
    return (
      <Marquee pauseOnHover className=" w-full h-8 bg-[#F5F7FA] text-black">
        <p className="mr-20 lg:mr-0 font-medium">
          {translation[lan].headingMarquee}
        </p>
      </Marquee>
    );
  }
};

export default HeadingMarquee;
