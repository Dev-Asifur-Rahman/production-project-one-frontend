"use client";

import React, { useState, useEffect } from "react";
// import { Around } from "@theme-toggles/react";

const ToggleTheme = () => {
  const [isToggled, setToggle] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme)
    // setToggle(savedTheme === "dark");
  }, []);

  const handleToggle = () => {
    const newTheme = isToggled ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setToggle(!isToggled);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[1000] flex items-center justify-center p-4">
      {/* <Around
        toggled={isToggled}
        onClick={handleToggle}
        className="text-3xl mmd:text-4xl md:text-5xl lg:text-6xl"
      /> */}
    </div>
  );
};

export default ToggleTheme;
