"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import ProductCard from "@/components/global-layout-components/ProductCard";
import { useEffect, useRef, useState } from "react";
import AllProductLink from "@/components/sub-components/home-left-components/AllProductLink";

const HomeLeftComponents = ({
  componentName = "Enter Name",
  Heading = "Enter Heading",
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (componentName === "just-for-you") {
      fetch("/api/cookies/visitor")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else if (componentName === "trending-stores") {
      fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}
/trending_stores`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [componentName]);

  return (
    <section
      className={`w-full ${
        componentName !== "just-for-you" && "mt-2"
      } relative`}
    >
      <AllProductLink
        Heading={Heading}
        categoryName={componentName}
      ></AllProductLink>

      <Swiper
        freeMode={true}
        spaceBetween={10}
        watchSlidesProgress={true} // required for arrows + freeMode
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          425: { slidesPerView: 2, slidesPerGroup: 2 },
          610: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        modules={[FreeMode, Navigation]}
        className="mySwiper relative"
      >
        {products?.map((product, index) => (
          <SwiperSlide className="smd:max-w-[300px] mb-10" key={index}>
            <ProductCard product={product}></ProductCard>
          </SwiperSlide>
        ))}

        <button
          ref={prevRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full shadow p-2 hover:scale-110 transition"
        >
          <img
            src="/images/left-arrow.png"
            alt="Previous"
            className="w-6 aspect-square"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full shadow p-2 hover:scale-110 transition"
        >
          <img
            src="/images/right-arrow.png"
            alt="Next"
            className="w-6 aspect-square"
          />
        </button>
      </Swiper>
    </section>
  );
};

export default HomeLeftComponents;
