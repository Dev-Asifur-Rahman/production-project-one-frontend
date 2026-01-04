"use client";

import FooterLinks from "@/components/sub-components/footer/FooterLinks";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Footer = () => {
  const pathname = usePathname();
  const {lan} = useContext(LanguageContext)
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
        className="w-full p-5 bg-[#006A4E] text-white"
      >
        {/* link and get us section  */}
        <section className="w-full lg:mt-14 md:mt-10 smd:mt-8 mt-5 flex lg:flex-row md:flex-row smd:flex-col flex-col lg:gap-0 md:gap-0 gap-5 lg:mb-12 md:mb-10 smd:mb-8 mb-5">
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
          <div
            id="footer-get-app-div"
            className="lg:w-1/4 md:w-1/4 w-full flex flex-col justify-center
         items-center gap-5"
          >
            <section className="">
              <img
                height={30}
                width={30}
                src="https://img.icons8.com/fluency/48/chrome-web-store.png"
                alt=""
              />

              <p>
                <span>Available in the</span>
                <br />
                Chrome Web Store
              </p>
            </section>
            {/* <section className="">
            <img
              height={30}
              width={30}
              src="https://img.icons8.com/fluency/48/google-play.png"
              alt=""
            />
            <p>
              <span>GET IT ON</span>
              <br /> Google Play
            </p>
          </section>
          <section>
            <img
              height={30}
              width={30}
              src="https://img.icons8.com/deco-color/48/mac-os.png"
              alt=""
            />
            <p>
              <span>Download On The</span>
              <br /> App Store
            </p>
          </section> */}
          </div>
        </section>

        {/*brand name and copyright container  */}
        <div className="flex lg:flex-row md:flex-row smd:flex-col flex-col lg:justify-between  md:justify-between md:items-center smd:justify-center justify-center lg:items-center gap-4 md:gap-0 lg:gap-0">
          {/* brand name and icon  */}
          <div className="flex gap-1 lg:justify-start md:justify-start smd:justify-center justify-center items-center">
            <img src="/logo/deal-bondhu-logo.svg" alt="" className="w-40" />
          </div>
          {/* copyright  */}
          <div className="text-sm lg:mr-40 flex lg:flex-row md:flex-row smd:flex-col flex-col lg:justify-between md:justify-between smd:justify-center justify-center lg:gap-6 md:gap-5 gap-3">
            <p className="text-center">
              {translation[lan].footer.copyright}
            </p>
            {/* <div className="flex justify-center items-center gap-2">
            <span>redesign </span>
            <span>mobile</span>
            <span> classic</span>
          </div> */}
          </div>
        </div>
      </section>
    );
  }
};

export default Footer;
