"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext } from "react";

const DashboardSearchBar = ({ setSearch }) => {
  const {lan} = useContext(LanguageContext)
  const handleSearch = (e) => {
    const value = e.target.value.trim().replace(/\s+/g, "").toLowerCase();

    setSearch(value || "all");
  };

  return (
    <div className="w-fit h-fit">
      <input
        onChange={handleSearch}
        type="text"
        placeholder={translation[lan].dashboard.clickedInfo.searchbar_placeholder}
        className="input w-60 lg:w-44 focus:outline-none focus:ring-0"
      />

    </div>
  );
};

export default DashboardSearchBar;
