"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { BsSearch } from "react-icons/bs";

const DashboardSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = searchParams.get("date") || "";

  const handleSearch = (e) => {
    router.push(`?search=${e.target.value}&date=${currentDate}`);
  };
  return (
    <div className="relative w-3/6 h-8 mmd:h-9 md:h-10 mx-auto mb-5">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search deals, Coupons, Stores and more ..."
        className="input w-full h-full rounded-2xl smd:rounded-4xl focus:outline-none focus:ring-0 lg:pl-6 mmd:pl-3 pl-4"
      />
      <BsSearch
        id="navbar-search-icon"
        className="absolute cursor-pointer bg-white  smd:w-6 w-4  smd:h-6 h-4 top-1/2 right-[4%] mmd:right-[2%] -translate-y-1/2"
      />
    </div>
  );
};

export default DashboardSearchBar;
