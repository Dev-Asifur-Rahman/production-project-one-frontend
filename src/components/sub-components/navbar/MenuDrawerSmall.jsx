"use client";
import React, { useState } from "react";

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
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
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
