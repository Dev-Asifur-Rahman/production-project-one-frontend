"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

// Import required modules
import { EffectCreative, Navigation, Autoplay } from "swiper/modules";

const OfferAndDiscountSlider = () => {
  const banners = [
    {
      banner_link: "https://i.ibb.co.com/PGznnZzj/banner-one.png",
    },
    {
      banner_link: "https://i.ibb.co.com/qMCqWyxz/banner-two.png",
    },
    {
      banner_link: "https://i.ibb.co.com/4RHbYGX4/banner-three.png",
    },
    {
      banner_link: "https://i.ibb.co.com/fY9GmFZ4/banner-four.png",
    },
  ];
  return (
    <section className="w-full">
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
