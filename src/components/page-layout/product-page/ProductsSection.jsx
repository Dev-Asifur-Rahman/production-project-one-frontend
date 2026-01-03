"use client";
import ProductCard from "@/components/global-layout-components/ProductCard";
import React, { useEffect, useState } from "react";

const ProductsSection = ({ get_products }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(get_products);
  }, []);

  const handleSortByName = (e) => {
    const value = e.target.value;

    const sorted = [...products].sort((a, b) => {
      if (value === "Ascending Order") {
        return a.title.localeCompare(b.title);
      }
      if (value === "Decending Order") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setProducts(sorted);
  };

  const handleSortByPrice = (e) => {
    const value = e.target.value;

    const sorted = [...products].sort((a, b) => {
      if (value === "Low to High") {
        return a.regular_price - b.regular_price;
      }
      if (value === "High to Low") {
        return b.regular_price - a.regular_price;
      }
      return 0;
    });

    setProducts(sorted);
  };

  return (
    <section>
      <div className="w-full flex justify-between items-center my-4">
        <select
          onChange={handleSortByName}
          defaultValue="Sort By Name"
          className="select"
        >
          <option disabled={true}>Sort By Name</option>
          <option>Ascending Order</option>
          <option>Decending Order</option>
        </select>
        <select
          onChange={handleSortByPrice}
          defaultValue="Sort By Price"
          className="select"
        >
          <option disabled={true}>Sort By Price</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 smd:grid-cols-2 grid-cols-1 place-items-center">
        {products?.map((product, index) => {
          return <ProductCard product={product} key={index}></ProductCard>;
        })}
      </div>
    </section>
  );
};

export default ProductsSection;
