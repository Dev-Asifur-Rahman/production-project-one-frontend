"use client";

import { openModal } from "@/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";

const PostDeal = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className=" bg-[#196296] hover:bg-[#0ef] "
        onClick={() => dispatch(openModal())}
      >
        <GoPlus />
        <p className="">Post Deal</p>
      </div>
    </>
  );
};

export default PostDeal;
