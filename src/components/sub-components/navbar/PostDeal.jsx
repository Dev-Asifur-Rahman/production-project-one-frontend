"use client";

import { openModal } from "@/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";

const PostDeal = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className=" bg-[#146FF5] hover:bg-[#0E4EAC]"
        
        onClick={() => dispatch(openModal())}
      >
        <GoPlus />
        <p>Post Deal</p>
      </div>
    </>
  );
};

export default PostDeal;
