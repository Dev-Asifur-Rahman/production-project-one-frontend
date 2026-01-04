"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";

const CommentProduct = ({ id, user_id }) => {
  const router = useRouter();
  const session = useSession();
  const { lan } = useContext(LanguageContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const target = e.target;

    if (!session?.data?.user) {
      target.reset();
      router.push("/auth/login");
      toast.error("LogIn First");
      return;
    }

    const value = target.comment.value;
    const comment = value.trim();
    if (!comment) toast.error("comment cant be empty");
    else {
      const object = {
        id,
        comment,
        dealer_id: user_id,
      };
      fetch("/api/cookies/comment_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            toast.success("commented");
            target.reset();
            router.refresh();
          }
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-5 gap-3">
      <label htmlFor="">{translation[lan].common.comment}</label>
      <input type="text" className="input" name="comment" required />
      <button className="btn btn-md bg-[#006A4E] text-white w-fit mx-2">
        {translation[lan].productDetailsPage.common.leave_comment}
      </button>
    </form>
  );
};

export default CommentProduct;
