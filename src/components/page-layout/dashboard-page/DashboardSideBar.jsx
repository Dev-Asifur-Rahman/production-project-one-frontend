"use client";
import { useState } from "react";
import PendingProducts from "./PendingProducts";
import ArchiveProducts from "./ArchiveProducts";
import CategoryPage from "./CategoryPage";
import AllBanners from "./AllBanners";
import AllProducts from "./AllProducts";
import ClickedInfo from "./ClickedInfo";
import Leaderboard from './Leaderboard';
import RisingStars from "./RisingStars";

const DashboardSideBar = () => {
  const [tab, setTab] = useState("item1");

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
        <label htmlFor="my-drawer-3" className="btn drawer-button md:hidden">
          Open drawer
        </label>

        {/* Right-side content */}
        <div className="p-4 w-full">
          {tab === "item1" && <CategoryPage></CategoryPage>}
          {tab === "item2" && <AllProducts></AllProducts>}
          {tab === "item3" && <PendingProducts></PendingProducts>}
          {tab === "item4" && <ArchiveProducts></ArchiveProducts>}
          {tab === "item5" && <AllBanners></AllBanners>}
          {tab === "item6" && <ClickedInfo></ClickedInfo>}
          {tab === "item7" && <RisingStars></RisingStars>}
          {tab === "item8" && <Leaderboard></Leaderboard> }
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-60 p-4">
          <li>
            <a onClick={() => handleClick("item1")}>Categories</a>
          </li>
          <li>
            <a onClick={() => handleClick("item2")}>Products</a>
          </li>
          <li>
            <a onClick={() => handleClick("item3")}>Pending Products</a>
          </li>
          <li>
            <a onClick={() => handleClick("item4")}>Archive Products</a>
          </li>
          <li>
            <a onClick={() => handleClick("item5")}>Banners</a>
          </li>
          <li>
            <a onClick={() => handleClick("item6")}>Clicked User</a>
          </li>
          <li>
            <a onClick={() => handleClick("item7")}>Rising Stars</a>
          </li>
          <li>
            <a onClick={() => handleClick("item8")}>Leaderboard</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
