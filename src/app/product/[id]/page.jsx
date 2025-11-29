import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { MdOutlineComment } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import RedirectButton from "@/components/page-layout/product-page/RedirectButton";

const page = async ({ params }) => {
  const { id } = await params;

  return (
    <section className="w-full">
      {/* product details div  */}
      <div className="w-[96%] mx-auto mt-10 flex flex-col smd:flex-row rounded-md shadow-md items-center smd:items-stretch">
        <div className="w-full smd:w-2/5 max-w-[270px] smd:max-w-[310px] aspect-square bg-[#d1e2f5] rounded-lg shadow-2xl">
          <img
            src="https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
            alt=""
            className="h-full w-full object-cover mix-blend-multiply"
          />
        </div>
        <div className="w-full smd:w-3/5 p-2 md:p-4  ">
          <p className="text-sm md:text-lg lg:text-2xl font-medium">
            The North Face Men's Vault Backpack (Clay Gray/New Taupe Green, Fits
            15" Laptop)
          </p>
          <p className="my-2 md:my-4 font-semibold md:text-xl lg:text-3xl">
            39$ <span className="text-[#777777] line-through">65$</span>{" "}
            <span className="text-green-500">40% OFF</span>
          </p>

          {/* like dislike comment views */}
          <div className="text-sm md:text-lg lg:text-xl flex items-center gap-3 lg:gap-10">
            {/* if like use like here  */}
            <p className="flex gap-1 items-center">
              17 <FcLikePlaceholder />
              {/* <FcLike /> */}
            </p>
            <p className="flex gap-1 items-center">
              3 <FcDislike />
            </p>
            <p className="flex gap-1 items-center">
              <MdOutlineComment />
              102
            </p>
            <p className="flex gap-1 items-center">
              <GiClick />
              23,549
            </p>
          </div>

          {/* deal button share and bookmark  */}
          <div className="mt-3 md:mt-6 flex gap-3 items-center">
            <RedirectButton></RedirectButton>
            <div className="p-3 rounded-full border w-fit hover:bg-gray-400 hover:text-white">
              <IoIosSend />
            </div>
            <div className="p-3 rounded-full border w-fit hover:bg-gray-400 hover:text-white">
              <CiBookmark />
            </div>
          </div>
        </div>
      </div>

      {/* tab section  */}
      <section className="bg-[#FFFFFF] mt-0 m-4 mmd:p-4 ">
        <div className="tabs tabs-border">
          {/* <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Deal Details"
            defaultChecked
          />
          <div className="tab-content p-2">Tab content 1</div>  */}

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Product Info"
            defaultChecked
          />
          <div className="tab-content   p-2">Tab content 2</div>

          {/* <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Community Notes"
          />
          <div className="tab-content  p-2">Tab content 3</div> */}
        </div>
      </section>
    </section>
  );
};

export default page;
