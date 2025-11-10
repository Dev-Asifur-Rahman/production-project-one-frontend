import CouponsAndDiscounts from "@/components/page-layout/home-page/CouponsAndDiscounts";
import FeaturedCouponsAndDiscounts from "@/components/page-layout/home-page/CouponsAndDiscounts";
import JustForYou from "@/components/page-layout/home-page/JustForYou";
import PopularDeals from "@/components/page-layout/home-page/PopularDeals";
import TopCategories from "@/components/page-layout/home-page/TopCategories";
import TrendingDeals from "@/components/page-layout/home-page/TrendingDeals";
import TrendingStores from "@/components/page-layout/home-page/TrendingStores";

export default function Home() {
  return (
    <>
      <div className="w-full lg:mt-15 md:mt-12 smd:mt-10 mt-8 flex lg:flex-row md:flex-row smd:flex-col-reverse flex-col-reverse gap-4">
        {/* two section will be flex in large screen md and small devices flex row reverse  */}
        <section className="lg:w-[70%] md:w-[65%] border">
          <JustForYou></JustForYou>
          <TrendingStores></TrendingStores>
          <TopCategories></TopCategories>
        </section>
        <section className="lg:w-[30%] md:w-[35%] w-full border">
          <PopularDeals></PopularDeals>
          <TrendingDeals></TrendingDeals>
          <CouponsAndDiscounts></CouponsAndDiscounts>
        </section>
      </div>
    </>
  );
}
