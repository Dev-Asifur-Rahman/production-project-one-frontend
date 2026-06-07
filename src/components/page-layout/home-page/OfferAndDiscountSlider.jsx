"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

// Import required modules
import { EffectCreative, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const OfferAndDiscountSlider = () => {
  const banners = [
    {
      banner_link: "https://i.ibb.co.com/FbTk9h7F/PR-Image-scaled.jpg",
    },
    {
      banner_link:
        "https://i.ibb.co.com/tt74TWn/D-ae-clp-main-banner-20-08-2025-SM.webp",
    },
    {
      banner_link:
        "https://i.ibb.co.com/xSYpm6w3/ucbbank2026-src-https-eggyolk-chaldal.png",
    },
    {
      banner_link: "https://i.ibb.co.com/BVGp0LCx/iphone-17-1000x700-1-2.png",
    },
  ];
  return (
    <section className="w-full aspect-[1/0.35]">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[EffectCreative, Navigation, Autoplay]}
        className="mySwiper w-full h-full"
      >
        {banners?.map((banner, index) => {
          return (
            <SwiperSlide key={index} className="">
              <img
                src={banner?.banner_link}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default OfferAndDiscountSlider;
