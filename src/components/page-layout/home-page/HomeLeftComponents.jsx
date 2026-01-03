"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import ProductCard from "@/components/global-layout-components/ProductCard";
import { useEffect, useRef, useState } from "react";
import AllProductLink from "@/components/sub-components/home-left-components/AllProductLink";

const HomeLeftComponents = ({ componentName = "Enter Name", Heading = "Enter Heading" ,lang='enter lang'}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        if (componentName === "just-for-you") {
          res = await fetch("/api/cookies/visitor");
        } else if (componentName === "trending-stores") {
          res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trending_stores`);
        } else if (componentName === "fashion") {
          res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_products/fashion?subcategory=undefined`);
        } else if (componentName === "electronics") {
          res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_products/electronics?subcategory=undefined`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [componentName]);

  return (
    <section className={`w-full ${componentName !== "just-for-you" ? "mt-2" : ""} relative`}>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-[400px]">
          <AllProductLink Heading={Heading} categoryName={componentName} />
          <span className="loading loading-dots loading-md mt-4"></span>
        </div>
      ) : (
        <>
          <AllProductLink Heading={Heading} categoryName={componentName} />
          <Swiper
            freeMode
            spaceBetween={10}
            watchSlidesProgress
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
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
            {products.map((product, index) => (
              <SwiperSlide key={index} className="smd:max-w-[300px] mb-10">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
            <button
              ref={prevRef}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full shadow p-2 hover:scale-110 transition"
            >
              <img src="/images/left-arrow.png" alt="Previous" className="w-6 aspect-square" />
            </button>
            <button
              ref={nextRef}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full shadow p-2 hover:scale-110 transition"
            >
              <img src="/images/right-arrow.png" alt="Next" className="w-6 aspect-square" />
            </button>
          </Swiper>
        </>
      )}
    </section>
  );
};

export default HomeLeftComponents;
