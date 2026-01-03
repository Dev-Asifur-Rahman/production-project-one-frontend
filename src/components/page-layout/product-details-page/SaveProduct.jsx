"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import toast from "react-hot-toast";

const SaveProduct = ({ id, isSaved, title }) => {
  const router = useRouter();
  const session = useSession();


  const handleSave = async () => {
    if (!session?.data?.user) {
      return toast.error("LogIn First");
    }
    if (isSaved) {
      return toast.error("Product Already Saved");
    }

    const res = await fetch(`/api/cookies/save_product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title }),
    });

    const result = await res.json();

    if (result.acknowledged === true) {
      toast.success("product saved successfully");
      router.refresh();
      return;
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaved}
      className={`p-3 rounded-full ${
        isSaved && "bg-gray-400 text-white"
      } border w-fit hover:bg-gray-400 cursor-pointer hover:text-white`}
    >
      <CiBookmark />
    </button>
  );
};

export default SaveProduct;
