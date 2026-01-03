"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Liked = ({ liked, id, count,category,subcategory,user_id }) => {
  const router = useRouter();
  const handleLike = () => {
    if (liked) {
      return toast.error("already liked");
    } else {
      const liked_object = {
        id,
        category,
        subcategory,
        dealer_id : user_id
      }
      fetch("/api/cookies/like_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(liked_object),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.user_id) {
            router.refresh();
          }
        });
    }
  };
  return (
    <p onClick={handleLike} className="flex gap-1 items-center cursor-pointer">
      {liked ? <FcLike /> : <FcLikePlaceholder />} {count}
    </p>
  );
};

export default Liked;
