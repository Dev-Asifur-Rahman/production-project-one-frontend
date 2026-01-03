"use client";
import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";

const MenuDrawerSmall = () => {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <div className="drawer drawer-end">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />

      <div className="drawer-content aspect-square ">
        <button onClick={() => setOpen(true)} className="flex justify-center items-center">
          <LuMenu className="text-white text-2xl" />
        </button>
      </div>

      <div className="drawer-side">
        <div className="drawer-overlay" onClick={closeDrawer}></div>

        <ul className="menu bg-base-100 min-h-full w-80 p-4">
          <li>
            <a onClick={closeDrawer}>Sidebar Item 1</a>
          </li>
          <li>
            <a onClick={closeDrawer}>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDrawerSmall;
