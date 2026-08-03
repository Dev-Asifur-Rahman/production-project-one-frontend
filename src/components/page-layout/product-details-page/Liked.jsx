"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";

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

const Liked = ({ liked, id, count, category, subcategory, user_id }) => {
  const router = useRouter();
  const handleLike = () => {
    if (liked) {
      return toast.error("already liked");
    } else {
      const liked_object = {
        id,
        category,
        subcategory,
        dealer_id: user_id,
      };
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
    <p onClick={handleLike} className="flex items-center cursor-pointer font-sans">
      {liked ? <IoHeartCircle  className="w-10 h-8 text-red-600"/> : <IoHeartCircleOutline  className="w-10 h-8 text-red-600"/>} {count? formatCount(count) : 'Be First'}
    </p>
  );
};

export default Liked;
