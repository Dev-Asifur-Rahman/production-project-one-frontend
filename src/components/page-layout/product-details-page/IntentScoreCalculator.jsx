"use client";
import { useEffect, useState } from "react";

const IntentScoreCalculator = () => {
  const [scrollTrigger, setScrollTrigger] = useState(false);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate_intent_score`,{
        method : 'POST'
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

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
