"use client";

import FooterLinks from "@/components/sub-components/footer/FooterLinks";

const Footer = () => {
  return (
    <section className="w-full bg-[#333333] p-5 text-white">
      {/* link and get us section  */}
      <section className="w-full lg:mt-14 md:mt-10 smd:mt-8 mt-5 flex lg:flex-row md:flex-row smd:flex-col flex-col lg:gap-0 md:gap-0 gap-5 lg:mb-12 md:mb-10 smd:mb-8 mb-5">
        {/* link section  */}
        <div className="lg:w-3/4 md:w-3/4 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-y-5">
          <FooterLinks
            heading="Follow Us"
            links={["Twitter", "Facebook", "Instagram", "YouTube"]}
          ></FooterLinks>
          <FooterLinks
            heading="About"
            links={[
              "About Us",
              "Help Center",
              "Advertising Opportunities",
              "Careers",
              "Contact Us",
            ]}
          ></FooterLinks>
          <FooterLinks
            heading="More"
            links={[
              "SlickDeals Coupons",
              "Deal Alerts",
              "SlickDeals Live",
              "Black Friday Deals",
              "SlickDeals Cashback Rewards",
            ]}
          ></FooterLinks>
          <FooterLinks
            heading="Legal"
            links={[
              "Privacy Politcies",
              "Terms & Policies",
              "Interst Based Ads",
              "State Privacy Rights",
              "Websiite Accessibility",
            ]}
          ></FooterLinks>
        </div>

        {/* get us section  */}
        <div className="lg:w-1/4 md:w-1/4 w-full border border-blue-500">
          hello
        </div>
      </section>

      {/*brand name and copyright container  */}
      <div className="flex lg:flex-row md:flex-row smd:flex-col flex-col lg:justify-between  md:justify-between md:items-center smd:justify-center justify-center lg:items-center gap-4 md:gap-0 lg:gap-0">
        {/* brand name and icon  */}
        <div className="flex gap-1 lg:justify-start md:justify-start smd:justify-center justify-center items-center">
          <img
            height={40}
            width={40}
            src="https://static.slickdealscdn.com/image-pool/sd-branding/sd-logomark-blueberry-update.svg"
            alt=""
          />
          <p className="italic text-xl font-semibold">SlickDeals</p>
        </div>
        {/* copyright  */}
        <div className="text-sm flex lg:flex-row md:flex-row smd:flex-col flex-col lg:justify-between md:justify-between smd:justify-center justify-center lg:gap-6 md:gap-5 gap-3">
          <p className="text-center">
            Copyright 1999 - 2025. Slickdeals, LLC. All Rights Reserved.
          </p>
          <div className="flex justify-center items-center gap-2">
            <span>redesign </span>
            <span>mobile</span>
            <span> classic</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
