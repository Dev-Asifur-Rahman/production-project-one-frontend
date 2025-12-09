import HomeLeftComponents from "@/components/page-layout/home-page/HomeLeftComponents";
import HomeRightComponents from "@/components/page-layout/home-page/HomeRightComponents";
import TopCategories from "@/components/page-layout/home-page/TopCategories";

import { PiFireFill } from "react-icons/pi";
import { IoTrendingUp } from "react-icons/io5";
import OfferAndDiscountSlider from "@/components/page-layout/home-page/OfferAndDiscountSlider";
import CategoryRanking from "@/components/page-layout/home-page/CategoryRanking";

export default function Home() {
  return (
    <>
      <OfferAndDiscountSlider></OfferAndDiscountSlider>
      <div className="w-full lg:mt-15 md:mt-12 smd:mt-10 mt-8 flex lg:flex-row md:flex-row smd:flex-col-reverse flex-col-reverse gap-4">
        {/* two section will be flex in large screen md and small devices flex row reverse  */}
        <section className="lg:w-[70%] md:w-[65%]">
          <HomeLeftComponents
            componentName="just-for-you"
            Heading="Just For You"
          ></HomeLeftComponents>

          <HomeLeftComponents
            componentName="trending-stores"
            Heading="Trending Stores"
          ></HomeLeftComponents>
        </section>
        <section className="lg:w-[30%] md:w-[35%] w-full">
          <HomeRightComponents
            componentName={"popular-deals"}
            Heading="Popular Deals"
            HeadingIcon={<PiFireFill />}
          ></HomeRightComponents>

          {/* <HomeRightComponents
            componentName={"trending-categories"}
            Heading="Trending Categories"
            HeadingIcon={<IoTrendingUp />}
          ></HomeRightComponents> */}
          {/* <HomeRightComponents
            componentName={"trending-deals"}
            Heading="Trending Deals"
            HeadingIcon={<IoTrendingUp />}
          ></HomeRightComponents> */}
        </section>
      </div>
      <TopCategories></TopCategories>
      <HomeLeftComponents
        Heading="Fashion"
        componentName="fashion"
      ></HomeLeftComponents>
      <HomeLeftComponents
        Heading="Electronics"
        componentName="electronics"
      ></HomeLeftComponents>
      <CategoryRanking></CategoryRanking>
    </>
  );
}
