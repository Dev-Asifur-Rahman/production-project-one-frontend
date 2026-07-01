
import HomeComponents from "@/components/page-layout/home-page/HomeComponents";
import HomeRightComponents from "@/components/page-layout/home-page/HomeRightComponents";
import TopCategories from "@/components/page-layout/home-page/TopCategories";

import { PiFireFill } from "react-icons/pi";
import OfferAndDiscountSlider from "@/components/page-layout/home-page/OfferAndDiscountSlider";
import { cookies } from "next/headers";
import translation from "@/utils/translation";
import HomeRisingStars from "@/components/page-layout/home-page/HomeRisingStars";
import HomeLeaderBoard from "@/components/page-layout/home-page/HomeLeaderBoard";

export default async function Home() {
  const cookieStore = await cookies();
  const get_lang = cookieStore.get("lang");
  const lang = get_lang ? (JSON.parse(get_lang.value)?.lang || 'en') : 'en';
  return (
    <>
      <OfferAndDiscountSlider></OfferAndDiscountSlider>
      <div className="w-full lg:mt-15 md:mt-12 smd:mt-10 mt-8 ">
        {/* two section will be flex in large screen md and small devices flex row reverse  */}
          <HomeComponents
            componentName="just-for-you"
            Heading={translation[lang].homeLeftComponent.heading.just_for_you}
          ></HomeComponents>

          <HomeComponents
            componentName="trending-stores"
            Heading={translation[lang].homeLeftComponent.heading.trending_store}
          ></HomeComponents>

          <HomeComponents Heading={translation[lang].homeRightComponent.heading.popular_deals} componentName={"popular-deals"} ></HomeComponents>

        {/* <section className="lg:w-[30%] md:w-[35%] w-full">
          <HomeRightComponents
            componentName={"popular-deals"}
            Heading={translation[lang].homeRightComponent.heading.popular_deals}
            HeadingIcon={<PiFireFill />}
          ></HomeRightComponents>

          <HomeRightComponents
            componentName={"trending-categories"}
            Heading="Trending Categories"
            HeadingIcon={<IoTrendingUp />}
          ></HomeRightComponents>
          <HomeRightComponents
            componentName={"trending-deals"}
            Heading="Trending Deals"
            HeadingIcon={<IoTrendingUp />}
          ></HomeRightComponents>
        </section> */}
      </div>
      {/* <TopCategories></TopCategories> */}
      <HomeComponents
        Heading={translation[lang].homeLeftComponent.heading.fashion}
        componentName='fashion'
      ></HomeComponents>
      <HomeComponents
        Heading={translation[lang].homeLeftComponent.heading.electronics}
        componentName='electronics'
      ></HomeComponents>
      <HomeLeaderBoard></HomeLeaderBoard>
      <HomeRisingStars></HomeRisingStars>
    </>
  );
}
