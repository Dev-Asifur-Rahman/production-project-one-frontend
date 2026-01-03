"use client";
import { BsSearch } from "react-icons/bs";
// import { PiBellSimpleRingingThin } from "react-icons/pi";
// import { BsPhone } from "react-icons/bs";
import BrandName from "@/components/global-layout-components/BrandName";
import PostDeal from "@/components/sub-components/navbar/PostDeal";
import { usePathname } from "next/navigation";
import Sign from "@/components/sub-components/navbar/Sign";
import MenuDrawerSmall from "@/components/sub-components/navbar/MenuDrawerSmall";
import SavedItems from "@/components/sub-components/navbar/SavedItems";
import ToggleLanguage from "@/components/sub-components/navbar/ToggleLanguage";
import { useContext } from "react";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";

const NavBar = () => {
  const pathname = usePathname();
  const {lan} = useContext(LanguageContext)

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/verify_reset_code") ||
    pathname.startsWith("/reset_new_password")
  ) {
    return;
  } else {
    return (
      <>
        <section className="w-full px-3 smd:py-6 py-4 lg:py-7 flex justify-between bg-[#1f242d] items-center">
          {/* logo section */}
          <BrandName></BrandName>
          <ToggleLanguage></ToggleLanguage>
          

          {/* search bar  */}
          <div className=" inline-flex relative w-3/6 h-8 mmd:h-9 md:h-10">
            <input
              type="text"
              placeholder={translation[lan].navbar.searchBar}
              className="input w-full h-full rounded-2xl smd:rounded-4xl focus:outline-none focus:ring-0 lg:pl-6 mmd:pl-3 md:pl-4 pl-2"
            />
            <BsSearch
              id="navbar-search-icon"
              className="absolute cursor-pointer  smd:w-6 w-4  smd:h-6 h-4 top-1/2 right-[4%] mmd:right-[2%] -translate-y-1/2"
            />
          </div>

          {/* options */}
          <div
            id="navbar-icon-div"
            className="hidden mmd:inline-flex lg:flex mmd:justify-evenly mmd:gap-2 md:gap-0 items-center mmd:w-1/5"
          >
            {/* <div className=" bg-[] hover:bg-[#9B1264]">
            <PiBellSimpleRingingThin />
            <p>Deal Alerts</p>
          </div> */}
            <SavedItems></SavedItems>
            <PostDeal></PostDeal>
            {/* <div className=" bg-[#F4B40B] hover:bg-[#614805]">
            <BsPhone />
            <p>Go Mobile</p>
          </div> */}
            <Sign></Sign>
          </div>

          {/* menu for small screen  */}
          <div className="mmd:hidden">
            <div className="w-6 aspect-square flex justify-center items-center">
              <MenuDrawerSmall></MenuDrawerSmall>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default NavBar;
