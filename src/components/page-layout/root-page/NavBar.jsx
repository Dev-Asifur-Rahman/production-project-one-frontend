import { LuMenu } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { PiBellSimpleRingingThin } from "react-icons/pi";
// import { BsPhone } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi2";
import BrandName from "@/components/global-layout-components/BrandName";
import PostDeal from "@/components/sub-components/navbar/PostDeal";

const NavBar = () => {
  return (
    <>
      <section
        style={{
          background: `linear-gradient(21deg,rgba(123, 97, 207, 1) 0%, rgba(89, 101, 194, 1) 34%, rgba(86, 127, 196, 1) 59%, rgba(102, 158, 222, 1) 71%, rgba(255, 255, 255, 1) 98%)`,
        }}
        className="
 w-full px-3 py-4 lg:py-7 flex justify-between items-center"
      >
        {/* logo section  with searchbar for lg screen*/}
        <BrandName></BrandName>
        <div
          id="navbar-icon-div"
          className="hidden lg:flex lg:justify-evenly items-center lg:w-1/5"
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
          <div className=" bg-[#196296] hover:bg-[#f08b3e]">
            <HiUserCircle />
            <p className="text-[#1A1A1A]">Sign Up</p>
          </div>
        </div>
        {/* search bar section for md and small screen */}
        <div className="w-full lg:hidden text-center relative ">
          <input
            type="text"
            placeholder="search deals, coupons, stores and more ..."
            className="input w-4/5 smd:w-3/5 md: rounded-4xl focus:outline-none focus:ring-0"
          />

          <BsSearch
            id="navbar-search-icon"
            className="absolute bg-white w-6 h-6 top-1/2 right-[12%] smd:right-[22%] -translate-y-1/2"
          />
        </div>
        {/* menu section  */}
        <div className="lg:hidden">
          {/* menu for small and medium screen  */}
          <div className="text-white w-6 aspect-square">
            <LuMenu className="h-full w-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default NavBar;
