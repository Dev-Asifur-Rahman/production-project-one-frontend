"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const JustForYou = () => {
  return (
    <section className="w-full ">
      <Swiper
        slidesPerView={5}
        allowTouchMove={false}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {[...Array(15)].map((_, i) => (
          <SwiperSlide key={i}>Slide {i + 1}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default JustForYou;
