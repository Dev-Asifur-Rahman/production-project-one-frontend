"use client";

import { useEffect, useState } from "react";

const HomeRisingStars = () => {
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
    <div className="my-10 md:max-w-5/6 mx-auto">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
           Rising Stars In This Month
        </li>

        {risingStars?.map((user, index) => {
          return (
            <li key={index} className="list-row">
              <div className={`text-4xl ${setRankColor(index + 1)} font-medium opacity-30 tabular-nums`}>
                {index + 1}
              </div>
              <div className="list-col-grow">
                <div>{user?.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {user?.user_id || 'not registered'}
                </div>
              </div>
              <p className="text-xs uppercase font-semibold opacity-60">{user?.points} Pts</p>
            </li>
          );
        })}

      </ul>
    </div>
  );
};

export default HomeRisingStars;
