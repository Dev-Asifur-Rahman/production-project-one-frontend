"use client";
import ProductCard from "@/components/global-layout-components/ProductCard";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import React, { useContext, useEffect, useState } from "react";

const ProductsSection = ({ get_products }) => {
  const [products, setProducts] = useState([]);
  const { lan } = useContext(LanguageContext);
  useEffect(() => {
    setProducts(get_products);
  }, [get_products]);
  const handleSortByName = (e) => {
    const value = e.target.value;

    const sorted = [...products].sort((a, b) => {
      if (value === "Ascending Order" || value === "ঊর্ধ্বক্রম") {
        return a.title.localeCompare(b.title);
      }
      if (value === "Descending Order" || value === "অধোগমন") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setProducts(sorted);
  };

  const handleSortByPrice = (e) => {
    const value = e.target.value;

    const sorted = [...products].sort((a, b) => {
      if (value === "Low to High" || value === "কম থেকে বেশি") {
        return a.regular_price - b.regular_price;
      }
      if (value === "High to Low" || value === "বেশি থেকে কম") {
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
          defaultValue={translation[lan].productPage.sortByName.placeholder}
          className="select"
        >
          <option disabled={true}>
            {translation[lan].productPage.sortByName.options.sort_by_name}
          </option>
          <option>
            {translation[lan].productPage.sortByName.options.ascending_order}
          </option>
          <option>
            {translation[lan].productPage.sortByName.options.descending_order}
          </option>
        </select>
        <select
          onChange={handleSortByPrice}
          defaultValue={translation[lan].productPage.sortByPrice.placeholder}
          className="select"
        >
          <option disabled={true}>
            {translation[lan].productPage.sortByPrice.options.sort_by_price}
          </option>
          <option>
            {translation[lan].productPage.sortByPrice.options.low_to_high}
          </option>
          <option>
            {translation[lan].productPage.sortByPrice.options.high_to_low}
          </option>
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
