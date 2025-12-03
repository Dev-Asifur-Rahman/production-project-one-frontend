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

  if (id === "id") {
    return id;
  }
  // const res = await fetch(`${process.env.NEXTAUTH_URL}/get_product/${id}`);

  const product = await res.json();

  return (
    <section className="w-full">
      {/* product details div  */}

      {id === "id" ? (
        <p>ID</p>
      ) : (
        <div className="w-[96%] mx-auto mt-10 flex flex-col smd:flex-row rounded-md shadow-md items-center smd:items-stretch">
          <div className="w-full smd:w-2/5 max-w-[270px] smd:max-w-[310px] aspect-square bg-[#d1e2f5] rounded-lg shadow-2xl">
            <img
              src={
                product?.product_image
                  ? product?.product_image
                  : "https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
              }
              alt=""
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
          <div className="w-full smd:w-3/5 p-2 md:p-4  ">
            <p className="text-sm md:text-lg lg:text-2xl font-medium">
              {product?.title}
            </p>
            <p className="my-2 md:my-4 font-semibold md:text-xl lg:text-3xl">
              {product?.regular_price}${" "}
              <span className="text-[#777777] line-through">
                {product?.offer_price}$
              </span>{" "}
              <span className="text-green-500">
                {product?.offer_percent}% OFF
              </span>
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
              <RedirectButton
                title={product?.title}
                product_link={product?.product_link}
                company={product?.company}
              ></RedirectButton>
              <div className="p-3 rounded-full border w-fit hover:bg-gray-400 hover:text-white">
                <IoIosSend />
              </div>
              <div className="p-3 rounded-full border w-fit hover:bg-gray-400 hover:text-white">
                <CiBookmark />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tab section  */}
      {/* <section className="bg-[#FFFFFF] mt-0 m-4 mmd:p-4 ">
        <div className="tabs tabs-border">

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Product Info"
            defaultChecked
          />
          <div className="tab-content   p-2">Tab content 2</div>
        </div>
      </section> */}
    </section>
  );
};

export default page;
