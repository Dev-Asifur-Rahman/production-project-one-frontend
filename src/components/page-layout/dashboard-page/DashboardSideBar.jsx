"use client";
import { useContext, useState } from "react";
import PendingProducts from "./PendingProducts";
import ArchiveProducts from "./ArchiveProducts";
import CategoryPage from "./CategoryPage";

import AllProducts from "./AllProducts";
import ClickedInfo from "./ClickedInfo";
import Leaderboard from "./Leaderboard";
import RisingStars from "./RisingStars";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import Revenue from "./Revenue";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBoxOpen, FaCartArrowDown } from "react-icons/fa6";
import { TbShoppingCartQuestion } from "react-icons/tb";
import { RiInformationFill } from "react-icons/ri";
import { AiOutlineRise } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import { HiNewspaper } from "react-icons/hi";

const DashboardSideBar = () => {
  const [tab, setTab] = useState("item1");
  const { lan } = useContext(LanguageContext);

  const handleClick = (newTab) => {
    setTab(newTab);

    // Close drawer on mobile
    const drawerToggle = document.getElementById("my-drawer-3");
    if (drawerToggle && window.innerWidth < 768) {
      // md breakpoint
      drawerToggle.checked = false;
    }
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="w-fit mx-auto">
          <label
            htmlFor="my-drawer-3"
            className="btn drawer-button md:hidden bg-dealbondhu text-white"
          >
            {translation[lan].dashboard.menu.heading}
          </label>
        </div>

        {/* Right-side content */}
        <div className=" w-full bg-white dark:bg-inherit min-h-screen">
          {tab === "item1" && <CategoryPage></CategoryPage>}
          {tab === "item2" && <AllProducts></AllProducts>}
          {tab === "item3" && <PendingProducts></PendingProducts>}
          {tab === "item4" && <ArchiveProducts></ArchiveProducts>}
          {tab === "item6" && <ClickedInfo></ClickedInfo>}
          {tab === "item7" && <RisingStars></RisingStars>}
          {tab === "item8" && <Leaderboard></Leaderboard>}
          {tab === "item9" && <Revenue></Revenue>}
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className={`menu bg-base-200 min-h-full w-60 p-4 ${lan === 'en'? 'font-sans font-semibold' : 'font-shiliguri'}`}>
          <li>
            <a onClick={() => handleClick("item1")}>
              <BiSolidCategoryAlt className="text-base" />
              {translation[lan].dashboard.categories.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item2")}>
              <FaBoxOpen className="text-base"/>
              {translation[lan].dashboard.products.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item3")}>
              <TbShoppingCartQuestion className="text-base" />
              {translation[lan].dashboard.pendingProducts.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item4")}>
              <FaCartArrowDown className="text-base" />
              {translation[lan].dashboard.archiveProducts.heading}
            </a>
          </li>

          <li>
            <a onClick={() => handleClick("item6")}>
              <RiInformationFill className="text-base" />
              {translation[lan].dashboard.clickedInfo.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item7")}>
              <AiOutlineRise className="text-base" />
              {translation[lan].dashboard.risingStars.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item8")}>
              <MdLeaderboard className="text-base" />
              {translation[lan].dashboard.leaderboard.heading}
            </a>
          </li>
          <li>
            <a onClick={() => handleClick("item9")}>
              <HiNewspaper className="text-base" />
              {translation[lan].dashboard.revenue.heading}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
