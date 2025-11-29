"use client";
import { LuMenu } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
// import { PiBellSimpleRingingThin } from "react-icons/pi";
// import { BsPhone } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi2";
import BrandName from "@/components/global-layout-components/BrandName";
import PostDeal from "@/components/sub-components/navbar/PostDeal";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/products")) {
    return;
  } else {
    return (
      <>
        <section className="w-full px-3 smd:py-6 py-4 lg:py-7 flex justify-between bg-[#1f242d] items-center">
          {/* logo section */}
          <BrandName></BrandName>

          {/* search bar  */}
          <div className=" inline-flex relative w-3/6 h-8 mmd:h-9 md:h-10">
            <input
              type="text"
              placeholder="Search deals, Coupons, Stores and more ..."
              className="input w-full h-full rounded-2xl smd:rounded-4xl focus:outline-none focus:ring-0 lg:pl-6 mmd:pl-3 md:pl-4 pl-2"
            />
            <BsSearch
              id="navbar-search-icon"
              className="absolute cursor-pointer bg-white  smd:w-6 w-4  smd:h-6 h-4 top-1/2 right-[4%] mmd:right-[2%] -translate-y-1/2"
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
            <PostDeal></PostDeal>
            {/* <div className=" bg-[#F4B40B] hover:bg-[#614805]">
            <BsPhone />
            <p>Go Mobile</p>
          </div> */}
            <div className=" bg-[#196296] hover:bg-[#0ef]">
              <HiUserCircle />
              <p className="text-[#1A1A1A]">Sign Up</p>
            </div>
          </div>

          {/* menu for small screen  */}
          <div className="mmd:hidden border">
            <div className="text-white w-6 aspect-square">
              <LuMenu className="h-full w-full" />
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default NavBar;
