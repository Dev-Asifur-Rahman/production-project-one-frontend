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
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [bannerRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banners`),
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/get_swiper_speed/6944135c03cea8c48c6d3abd`
        ),
      ]);

      const bannerData = await bannerRes.json();
      

      setBanners(bannerData);
      setLoading(false);
    };

    fetchData();
  }, []);
  return loading ? (
    <div className="w-full aspect-[1/0.35] flex justify-center items-center">
      <span className="loading loading-dots loading-md"></span>
    </div>
  ) : (
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
