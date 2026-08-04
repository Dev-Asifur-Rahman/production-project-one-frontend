"use client";

import FooterLinks from "@/components/sub-components/footer/FooterLinks";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Footer = () => {
  const pathname = usePathname();
  const { lan } = useContext(LanguageContext);
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
      <section
        // style={{
        //   background: `linear-gradient(21deg,rgba(31, 36, 45, 1) 0%, rgba(5, 5, 13, 1) 34%, rgba(51, 51, 61, 1) 59%, rgba(90, 90, 99, 1) 71%, rgba(196, 196, 196, 1) 98%)`,
        // }}
        className="w-full p-5 bg-footer text-white"
      >
        {/* link and get us section  */}
        <section className="w-full lg:mt-14 md:mt-10 smd:mt-8 mt-5 flex lg:flex-row md:flex-row md:justify-center smd:flex-col flex-col lg:gap-0 md:gap-0 gap-5 lg:mb-12 md:mb-10 smd:mb-8 mb-5 ">
          {/* link section  */}
          <div className="lg:w-3/4 md:w-3/4 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-y-5">
            <FooterLinks
              heading={translation[lan].footer.followUs.heading}
              links={translation[lan].footer.followUs.lists}
            ></FooterLinks>
            <FooterLinks
              heading={translation[lan].footer.about.heading}
              links={translation[lan].footer.about.lists}
            ></FooterLinks>
            <FooterLinks
              heading={translation[lan].footer.more.heading}
              links={translation[lan].footer.more.lists}
            ></FooterLinks>
            <FooterLinks
              heading={translation[lan].footer.legal.heading}
              links={translation[lan].footer.legal.lists}
            ></FooterLinks>
          </div>

          {/* get us section  */}
        </section>

        {/*brand name and copyright container  */}
      </section>
    );
  }
};

export default Footer;
