"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

// Import required modules
import { EffectCreative, Navigation, Autoplay } from "swiper/modules";

const OfferAndDiscountSlider = () => {
  return (
    <section className="w-full lg:mt-8 md:mt-6 smd:mt-4 mt-3 aspect-[1/0.3]">
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
        <SwiperSlide className="">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/929/644/non_2x/special-offer-christmas-sale-up-to-50-off-beautiful-discount-banner-with-blue-winter-landscape-on-background-and-offer-in-vintage-frame-vector.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-black-friday-sale-text-emblem-label-banner-background-brush-style-discount-image_413496.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner_554907-284.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://marketplace.canva.com/EAGo0KJrL70/1/0/800w/canva-gold-and-black-modern-year-end-mega-sale-banner-landscape-z8O6RMuKa_Q.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default OfferAndDiscountSlider;
