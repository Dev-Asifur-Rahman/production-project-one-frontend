"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import ProductCard from "@/components/global-layout-components/ProductCard";

const JustForYou = () => {
  return (
    <section className="w-full ">
      <Swiper
       
        slidesPerView={5}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          320: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 2,
          },
          610: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper "
      >
        {[...Array(15)].map((_, i) => (
          <SwiperSlide className=" smd:max-w-[300px]" key={i}>
            <ProductCard>{i + 1}</ProductCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default JustForYou;
