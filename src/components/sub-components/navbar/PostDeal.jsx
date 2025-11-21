"use client";

import { openModal } from "@/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";

const PostDeal = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="tooltip bg-[#146FF5] hover:bg-[#0E4EAC]"
        data-tip="Post a Deal"
        onClick={() => dispatch(openModal())}
      >
        <GoPlus />
        <p>open modal</p>
      </div>
    </>
  );
};

export default PostDeal;
