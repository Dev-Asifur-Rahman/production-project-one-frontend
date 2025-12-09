"use client";
import React, { useEffect, useState } from "react";

const CategoryRanking = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}
/trending_categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Rank</th>
            <th>Category</th>
            <th>Sub Categories</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{category?.category}</td>
              <td>{category?.subcategory? category.subcategory : 'Unknown'}</td>
              <td>{category?.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryRanking;
