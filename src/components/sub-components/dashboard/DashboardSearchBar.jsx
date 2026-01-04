"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext } from "react";
import { BsSearch } from "react-icons/bs";

const DashboardSearchBar = ({ setSearch }) => {
  const {lan} = useContext(LanguageContext)
  const handleSearch = (e) => {
    const value = e.target.value.trim().replace(/\s+/g, "").toLowerCase();

    setSearch(value || "all");
  };

  return (
    <div className="relative w-3/6 h-8 mmd:h-9 md:h-10 mx-auto mb-5">
      <input
        onChange={handleSearch}
        type="text"
        placeholder={translation[lan].dashboard.clickedInfo.searchbar_placeholder}
        className="input w-full h-full rounded-2xl smd:rounded-4xl focus:outline-none focus:ring-0 lg:pl-6 mmd:pl-3 pl-4"
      />

      <BsSearch className="absolute cursor-pointer smd:w-6 w-4 smd:h-6 h-4 top-1/2 right-[4%] mmd:right-[2%] -translate-y-1/2" />
    </div>
  );
};

export default DashboardSearchBar;
