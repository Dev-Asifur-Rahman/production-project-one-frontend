"use client";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";

const BrandName = () => {
  const router = useRouter();
  return (
    <div className="lg:w-30 w-[25%] max-w-[90px] lg:max-w-none lg:aspect-[2.5/1.2] aspect-[2.5/1.2] cursor-pointer">
      <img
        onClick={() => router.push("/")}
        src="./logo/deal-bondhu-logo.svg"
        alt=""
        className=" w-full h-full "
      />
      {/* <p
        onClick={() => router.push("/")}
        className="cursor-pointer hidden md:inline-flex lg:inline-flex text-3xl text-black font-bold italic"
      >
        DealBondhu
      </p> */}
    </div>
  );
};

export default BrandName;
