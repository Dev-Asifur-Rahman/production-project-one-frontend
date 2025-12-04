"use client";
import { useRouter } from "next/navigation";

const BrandName = () => {
  const router = useRouter();
  return (
    <div className="lg:w-30 w-[25%] max-w-[90px] lg:max-w-none lg:aspect-[2.5/1.2] aspect-[2.5/1.2] cursor-pointer">
      <img
        onClick={() => router.push("/")}
        src="/logo/deal-bondhu-logo.svg"
        alt=""
        className=" w-full h-full "
      />
    </div>
  );
};

export default BrandName;
