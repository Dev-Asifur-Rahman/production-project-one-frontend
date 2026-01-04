"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import React, { useContext, useEffect, useState } from "react";

const RisingStars = () => {
  const [risingStars, setRisingStars] = useState([]);
  const { lan } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/monthly_rising_stars`
      );
      const data = await response.json();
      setRisingStars(data);
    };
    fetchData();
  }, []);

  const setRankColor = (rank) => {
    if (rank === 1) {
      return "text-yellow-500";
    }
    if (rank === 2) {
      return "text-gray-400";
    }
    if (rank === 3) {
      return "text-amber-700";
    } else {
      return "text-inherit";
    }
  };
  return (
    <section className="w-full">
      {risingStars?.length === 0 ? (
        <p className="w-full text-center">No Data</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-[#006A4E] dark:text-[#F42A41]">
                <th className="text-center">{translation[lan].common.rank}</th>
                <th>Name</th>
                <th className="text-center">
                  {translation[lan].common.monthly_point}
                </th>
                <th className="text-center">{translation[lan].common.level}</th>
                <th className="text-center">{translation[lan].common.id}</th>
              </tr>
            </thead>
            <tbody>
              {risingStars?.map((user, index) => {
                return (
                  <tr key={index}>
                    <th className={`${setRankColor(index + 1)} text-center`}>
                      {index + 1}
                    </th>
                    <td>{user?.name}</td>
                    <td>
                      <div className="text-center">{user?.monthly_point}</div>
                    </td>
                    <td>
                      <div className="text-center">{user?.level}</div>
                    </td>
                    <td>
                      <div className="text-center">
                        {user?.user_id ||
                          `${
                            lan === "en"
                              ? "Not Registered"
                              : "আইডি নিবন্ধিত নয়"
                          }`}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RisingStars;
