import { MdOutlineComment } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import RedirectButton from "@/components/page-layout/product-page/RedirectButton";
import Liked from "@/components/page-layout/product-details-page/Liked";
import { cookies } from "next/headers";
import Unlike from "@/components/page-layout/product-details-page/Unlike";
import CommentProduct from "@/components/page-layout/product-details-page/CommentProduct";
import SaveProduct from "@/components/page-layout/product-details-page/SaveProduct";
import { IoIosSend } from "react-icons/io";
import translation from "@/utils/translation";
import IntentScoreCalculator from "@/components/page-layout/product-details-page/IntentScoreCalculator";

const page = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();

  const visitor = cookieStore.get("visitor");
  const get_lang = cookieStore.get("lang")

  const user_id = JSON.parse(visitor.value)?.user_id;
  const lang = JSON.parse(get_lang.value)?.lang

  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL}
/get_product/${id}`,
    {
      headers: {
        "x-visitor-id": user_id,
      },
    }
  );

  const product = await res.json();
  return (
    <section className="w-full">
      {/* product details div  */}
      <div className="w-[96%] mx-auto mt-10 flex flex-col smd:flex-row rounded-md shadow-md items-center smd:items-stretch">
        <div className="w-full smd:w-2/5 max-w-[270px] smd:max-w-[310px] aspect-square bg-[#d1e2f5] rounded-lg shadow-2xl">
          <img
            src={product?.product_image}
            alt=""
            className="h-full w-full object-cover mix-blend-multiply"
          />
        </div>
        <div className="w-full smd:w-3/5 p-2 md:p-4  ">
          <p className="text-sm md:text-lg lg:text-2xl font-medium">
            {product?.title}
          </p>
          <div className="w-fit px-3 mt-2 text-white font-medium rounded-lg bg-[linear-gradient(21deg,rgba(255,54,67,1)_20%,rgba(209,65,82,1)_56%,rgba(219,127,136,1)_84%,rgba(232,209,209,1)_100%)]">
            {product?.offer_percent}% {translation[lang].common.off}
          </div>
          <p className="mb-2 md:my-4 font-semibold md:text-xl lg:text-3xl">
            {product?.offer_price} {translation[lang].common.taka}{" "}
            <span className="text-[#777777] line-through lg:text-xl md:text-sm">
              {product?.regular_price} {translation[lang].common.taka}
            </span>
          </p>

          {/* like dislike comment views */}
          <div className="text-sm md:text-lg lg:text-xl flex items-center gap-3 lg:gap-10">
            {/* if like use like here  */}
            <Liked
              liked={product?.liked}
              id={product?._id}
              count={product?.like_count}
              user_id={product?.dealer_id}
              category={product?.category}
              subcategory={product?.subcategory}
            ></Liked>
            <Unlike
              unliked={product?.unliked}
              id={product?._id}
              count={product?.unlike_count}
            ></Unlike>
            <p className="flex gap-1 items-center cursor-pointer">
              <MdOutlineComment />
              {product?.comment_count}
            </p>
            <p className="flex gap-1 items-center cursor-pointer">
              <GiClick />
              {product?.click_count}
            </p>
          </div>

          {/* deal button share and bookmark  */}
          <div className="mt-3 md:mt-6 flex gap-3 items-center">
            <RedirectButton
              title={product?.title}
              product_link={product?.product_link}
              company={product?.company}
            ></RedirectButton>
            <SaveProduct
              id={product?._id}
              isSaved={product?.isSaved}
              title={product?.title}
            ></SaveProduct>
            <div className="p-3 rounded-full border w-fit hover:bg-gray-400 hover:text-white">
              <IoIosSend />
              
            </div>
          </div>
        </div>
      </div>

      {/* tab section  */}
      <section className="mt-0 m-4 mmd:p-4 ">
        <div className="tabs tabs-border">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label={translation[lang].productDetailsPage.common.product_details}
            defaultChecked
          />
          <div
            className="tab-content   p-2"
            dangerouslySetInnerHTML={{ __html: product?.product_info }}
          ></div>
        </div>
      </section>

      <section className="mx-auto w-[96%]">
        <CommentProduct id={product?._id}></CommentProduct>
      </section>
      <IntentScoreCalculator product={product} user_id={user_id}></IntentScoreCalculator>
    </section>
  );
};

export default page;
