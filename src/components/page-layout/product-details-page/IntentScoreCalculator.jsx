"use client";
import React, { useEffect, useState } from "react";

const IntentScoreCalculator = () => {
  const [scrollTrigger, setScrollTrigger] = useState(false);
  useEffect(() => {
    console.log("User entered product page");

    const handleScroll = () => {
      const scrollRatio =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;

      if (scrollRatio >= 0.9 && !scrollTrigger) {
        console.log("User reached 90% scroll");
        setScrollTrigger(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("User left product page");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return null;
};

export default IntentScoreCalculator;
