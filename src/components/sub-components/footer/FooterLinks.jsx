"use client";

import { useEffect, useState } from "react";

const FooterLinks = ({ heading = "Enter Heading", links }) => {
  // control open attribute according to screensize
  const [isLargeSize, setSize] = useState(false);

  useEffect(() => {
    const checkScreen = () => setSize(window.innerWidth >= 768);

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <details open={isLargeSize} className="w-full lg:border-none md:border-none border-b smd:border-b pb pt-2 font-semibold">
      <summary className="list-none lg:text-xl md:text-lg text-base lg:pointer-events-none md:pointer-events-none text-start md:text-center lg:text-center lg:pr-15">
        {heading}
      </summary>
      <ul className="mt-3 ml-2">
        {
            links?.map((link,index)=><li className="text-sm font-normal my-2" key={index}>{link}</li>)
        }
      </ul>
    </details>
  );
};

export default FooterLinks;
