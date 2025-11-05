import { LuMenu } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { PiBellSimpleRingingThin } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { BsPhone } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi2";

const NavBar = () => {
  return (
    <>
      <section className="bg-[#333333] w-full px-3 py-4 lg:py-7 flex justify-between items-center">
        {/* logo section  */}
        <div className="flex items-center gap-1 lg:w-3/5">
          <img
            src="https://static.slickdealscdn.com/image-pool/sd-branding/sd-logomark-blueberry-update.svg"
            alt=""
            className="w-8 aspect-square"
          />
          <p className="hidden md:inline-flex lg:inline-flex text-3xl text-white font-bold italic">
            SlickDeals
          </p>
          {/* search bar for large screen  */}
          <div className="w-full hidden lg:inline-flex relative">
            <input
              type="text"
              placeholder="Search deals, Coupons, Stores and more ..."
              className="input ml-3 w-full rounded-4xl focus:outline-none focus:ring-0"
            />
            <BsSearch
              id="navbar-search-icon"
              className="absolute cursor-pointer bg-white w-6 h-6 top-1/2 smd:right-[2%] -translate-y-1/2"
            />
          </div>
        </div>
        <div id="navbar-icon-div" className="hidden lg:flex lg:justify-evenly items-center lg:w-2/5">
          <div className="tooltip bg-[#DD1A8F] hover:bg-[#9B1264]" data-tip="Deal Alerts">
            <PiBellSimpleRingingThin />
            <p>Deal Alerts</p>
          </div>
          <div className="tooltip bg-[#146FF5] hover:bg-[#0E4EAC]" data-tip="Post a Deal">
            <GoPlus />
            <p>Post a Deal</p>
          </div>
          <div className="tooltip bg-[#F4B40B] hover:bg-[#614805]" data-tip="Go Mobile">
            <BsPhone />
            <p>Go Mobile</p>
          </div>
          <div className="tooltip bg-[#EE6F40] hover:bg-[#CC4818]" data-tip="Sign Up">
            <HiUserCircle />
            <p>Sign Up</p>
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
