"use client";
import React, { useEffect, useState } from "react";

const RisingStars = () => {
  const [risingStars, setRisingStars] = useState([]);

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
              <tr>
                <th className="text-center">Rank</th>
                <th>Name</th>
                <th className="text-center">Monthly Points</th>
                <th className="text-center">Level</th>
                <th className="text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {risingStars?.map((user, index) => {
                return (
                  <tr>
                    <th className={`${setRankColor(index + 1)} text-center`}>
                      {index + 1}
                    </th>
                    <td>{user?.name}</td>
                    <td>
                      <div className="text-center">{user?.monthly_point}</div>
                    </td>
                    <td><div className="text-center">{user?.level}</div></td>
                    <td>
                      <div className="text-center">
                        {user?.user_id || "Not Registered"}
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
