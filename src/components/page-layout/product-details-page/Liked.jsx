"use client";
import { useRouter } from "next/navigation";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Liked = ({ liked, id }) => {
  const router = useRouter();
  const handleLike = (e) => {
    if (liked) {
      return alert("already liked");
    } else {
      fetch("/api/cookies/like_product", {
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
    <p onClick={handleLike} className="flex gap-1 items-center">
      17 {liked ? <FcLike /> : <FcLikePlaceholder />}
    </p>
  );
};

export default Liked;
