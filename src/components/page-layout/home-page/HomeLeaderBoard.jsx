"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useContext, useEffect, useState } from "react";

const HomeLeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { lan } = useContext(LanguageContext);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`,
      );
      const data = await res.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  const setRankColor = (rank) => {
    if (rank === 1) {
      return "text-gold";
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
    <ul className="list  ">
      <li className={` p-4 pb-2 text-base mmd:text-2xl opacity-60 tracking-wide bg-base-100 rounded-box shadow-md uppercase ${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`}>
        {translation[lan].homeLeftComponent.heading.leaderboard}
      </li>

      {leaderboard?.slice(0, 5).map((user, index) => {
        return (
          <li key={index} className="list-row rounded-box shadow-md bg-base-100 mt-2">
            <div
              className={`text-4xl ${setRankColor(index + 1)} font-medium tabular-nums`}
            >
              {index + 1}
            </div>
            <div className="list-col-grow">
              <div className={`${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`}>{user?.name}</div>
              <div title={user?.user_id} className={`text-xs uppercase font-semibold opacity-60 line-clamp-1 font-sans ${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`}>
                {user?.user_id || "not registered"}
              </div>
            </div>
            <p className={`text-xs uppercase opacity-60 font-semibold ${lan === 'en' ? 'font-sans' : 'font-shiliguri'}`}>
              {user?.points} Pts
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default HomeLeaderBoard;
