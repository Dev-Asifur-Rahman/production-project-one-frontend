"use client";
import { useEffect, useState } from "react";

const IntentScoreCalculator = ({product,user_id}) => {
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const [leaveTrigger, setLeaveTrigger] = useState(false);

  const intentScoreCalculatorFunction = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate_intent_score`,
      {
        method: "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            session : session,
            product_id : product?._id,
            dealer_id : product?.dealer_id,
            user_id : user_id
        })
      }
    );
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    if (!leaveTrigger) {
      intentScoreCalculatorFunction("entered");
    }

    const handleScroll = () => {
      const scrollRatio =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;

      if (scrollRatio >= 0.9 && !scrollTrigger) {
        intentScoreCalculatorFunction("scrolled");
        setScrollTrigger(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (!leaveTrigger) {
        intentScoreCalculatorFunction("leave");
        setLeaveTrigger(true);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return null;
};

export default IntentScoreCalculator;
