"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FcDislike } from "react-icons/fc";
import {  IoHeartDislikeCircle, IoHeartDislikeCircleOutline } from "react-icons/io5";

const formatCount = (count = 0) => {
  if (count < 1000) return count.toString();

  const units = [
    { value: 1000000000, suffix: "B" },
    { value: 1000000, suffix: "M" },
    { value: 1000, suffix: "K" },
  ];

  for (const unit of units) {
    if (count >= unit.value) {
      return (count / unit.value).toFixed(1).replace(/\.0$/, "") + unit.suffix;
    }
  }

  return count.toString();
};

const Unlike = ({ unliked, id, count }) => {
  const router = useRouter()
  const handleUnlike = async () => {
    if(unliked){
        toast.error("already unliked")
    }
    else{
        fetch("/api/cookies/unlike_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            router.refresh();
          }
        });
    }
  };
  return (
    <p onClick={handleUnlike} className="flex items-center cursor-pointer font-sans">
      {unliked ? <IoHeartDislikeCircle  className="w-10 h-8 text-red-600"/>
 : <IoHeartDislikeCircleOutline  className="w-10 h-8 text-red-600"/>
} {count ? formatCount(count) : 'Be First'}
    </p>
  );
};

export default Unlike;
