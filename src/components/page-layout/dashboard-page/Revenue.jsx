"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/revenue`);
      const data = await res.json();
      setRevenueData(data?.data);
    };
    fetchData();
  }, []);
  return (
    <section className="w-full">
      {revenueData?.length === 0 ? (
        <p className="w-full text-center">No Data</p>
      ) : (
        <section className="w-full">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Company</th>
                  <th>People Viewed</th>
                  <th>Price</th>
                  <th>Revenue (TK)</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                </tr>
              </thead>
              <tbody>
                {revenueData?.map((product, index) => {
                  return (
                    <tr key={index}>
                      <th className="text-center">{index + 1}</th>
                      <td>{product?.title}</td>
                      <td className="text-center">{product?.company}</td>
                      <td className="text-center">{product?.total_users}</td>
                      <td className="text-center">
                        {product?.revenue_estimate?.avg_price}
                      </td>
                      <td className="text-center">
                        {product?.revenue_estimate?.total_bdt}
                      </td>
                      <td>{product?.category}</td>
                      <td>{product?.subcategory}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
};

export default Revenue;
