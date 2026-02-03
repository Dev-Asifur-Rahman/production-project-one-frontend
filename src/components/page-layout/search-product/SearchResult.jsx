"use client";
import ProductCard from "@/components/global-layout-components/ProductCard";
import React, { useEffect, useState } from "react";

const SearchResult = ({ productData }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productData);
  }, [productData]);
  return (
    <section className="lg:w-4/5 mx-auto my-5">
      <div className="w-full flex justify-between items-center my-4 mx-auto">
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 smd:grid-cols-2 grid-cols-1 place-items-center">
          {products?.map((product, index) => {
            return <ProductCard product={product} key={index}></ProductCard>;
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
