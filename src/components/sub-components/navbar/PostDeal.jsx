"use client";

import { openModal } from "@/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import translation from "@/utils/translation";
import { useContext } from "react";
import { LanguageContext } from "@/context/GlobalLanguageProvider";

const PostDeal = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const {lan} = useContext(LanguageContext)

  const handleNavigate = () => {
    if (session.status === "unauthenticated" || session.status === "loading") {
      return toast.error("Sign In First");
    } else {
      dispatch(openModal());
      return
    }
  };
  return (
    <>
      <div className=" bg-[#F42A41]" onClick={handleNavigate}>
        <GoPlus />
        <p className="">{translation[lan].navbar.logo[1]}</p>
      </div>
    </>
  );
};

export default PostDeal;
