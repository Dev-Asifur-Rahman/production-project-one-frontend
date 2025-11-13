"use client";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";

const BrandName = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1 lg:w-3/5">
      <img onClick={()=>router.push('/')}
        src="https://static.slickdealscdn.com/image-pool/sd-branding/sd-logomark-blueberry-update.svg"
        alt=""
        className="w-8 aspect-square"
      />
      <p
        onClick={() => router.push("/")}
        className="cursor-pointer hidden md:inline-flex lg:inline-flex text-3xl text-white font-bold italic"
      >
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
  );
};

export default BrandName;
