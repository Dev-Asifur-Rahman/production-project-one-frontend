"use client";
import React, { useState } from "react";

const MenuDrawerSmall = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="drawer drawer-end">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={toggleDrawer}
      />

      <div className="drawer-content aspect-square">
        <label className="btn btn-circle swap swap-rotate bg-transparent border-none">
          <input type="checkbox" checked={open} onChange={toggleDrawer} />

          <svg
            className="swap-off fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      {/* Drawer side */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={closeDrawer}></label>

        <ul className="menu bg-base-100 min-h-full w-80 p-4">
          <li>
            <a onClick={closeDrawer}>Post Deal</a>
          </li>
          <li>
            <a onClick={closeDrawer}>Saved Items</a>
          </li>
          <li>
            <details>
              <summary>Category</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Language</summary>
              <ul>
                <li>
                  <a>English (active)</a>
                </li>
                <li>
                  <a>বাংলা (active)</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>SignIn</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDrawerSmall;
