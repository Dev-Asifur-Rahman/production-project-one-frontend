"use client";
import { useRouter } from "next/navigation";

const BrandName = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex-1 md:flex-none cursor-pointer w-fit"
    >
      <img
        src="/logo/deal-bondhu-logo.svg"
        alt=""
        className="w-1/3 aspect-[2.5/1.2] md:w-30 md:aspect-[2.5/1.2]  max-w-[90px] md:max-w-none"
      />
    </div>
  );
};

export default BrandName;

//
