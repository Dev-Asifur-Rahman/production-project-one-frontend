"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useContext, useEffect, useState } from "react";

const FooterLinks = ({ heading = "Enter Heading", links }) => {
  // control open attribute according to screensize
  const [isLargeSize, setSize] = useState(false);
  const {lan} = useContext(LanguageContext)

  useEffect(() => {
    const checkScreen = () => setSize(window.innerWidth >= 768);

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <details open={isLargeSize} className="w-full lg:border-none md:border-none border-b smd:border-b pb pt-2 font-semibold">
      <summary className={`list-none lg:text-xl md:text-lg text-dealbondhu lg:pointer-events-none md:pointer-events-none text-start md:text-start lg:text-start lg:pr-15 uppercase ${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`}>
        {heading}
      </summary>
      <ul className="mt-3 ml-2">
        {
            links?.map((link,index)=><li className={`text-base font-normal my-2 cursor-pointer hover:underline text-black font-sans ${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`} key={index}>{link}</li>)
        }
      </ul>
    </details>
  );
};

export default FooterLinks;
