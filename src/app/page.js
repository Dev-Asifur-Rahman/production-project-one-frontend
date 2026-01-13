import HomeLeftComponents from "@/components/page-layout/home-page/HomeLeftComponents";
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
      <div className="w-full lg:mt-15 md:mt-12 smd:mt-10 mt-8 flex lg:flex-row md:flex-row smd:flex-col-reverse flex-col-reverse gap-4">
        {/* two section will be flex in large screen md and small devices flex row reverse  */}
        <section className="lg:w-[70%] md:w-[65%]">
          <HomeLeftComponents
            componentName="just-for-you"
            Heading={translation[lang].homeLeftComponent.heading.just_for_you}
          ></HomeLeftComponents>

          <HomeLeftComponents
            componentName="trending-stores"
            Heading={translation[lang].homeLeftComponent.heading.trending_store}
          ></HomeLeftComponents>
        </section>
        <section className="lg:w-[30%] md:w-[35%] w-full">
          <HomeRightComponents
            componentName={"popular-deals"}
            Heading={translation[lang].homeRightComponent.heading.popular_deals}
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
        Heading={translation[lang].homeLeftComponent.heading.fashion}
        componentName='fashion'
      ></HomeLeftComponents>
      <HomeLeftComponents
        Heading={translation[lang].homeLeftComponent.heading.electronics}
        componentName='electronics'
      ></HomeLeftComponents>
      <HomeLeaderBoard></HomeLeaderBoard>
      <HomeRisingStars></HomeRisingStars>
    </>
  );
}
