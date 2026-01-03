"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FcDislike } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";

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
    <p onClick={handleUnlike} className="flex gap-1 items-center cursor-pointer">
      {unliked ? <FcDislike /> : <RiDislikeLine />} {count}
    </p>
  );
};

export default Unlike;
