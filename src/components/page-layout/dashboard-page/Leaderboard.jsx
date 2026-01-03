"use client";
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`
      );
      const data = await response.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
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
      {leaderboard?.length === 0 ? (
        <p className="w-full text-center">No Data</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Rank</th>
                <th>Name</th>
                <th className="text-center">Points Collected</th>
                <th className="text-center">Level</th>
                <th className="text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard?.map((user, index) => {
                return (
                  <tr key={index}>
                    <th className={`${setRankColor(index + 1)} text-center`}>
                      {index + 1}
                    </th>
                    <td>
                      <div className="line-clamp-2">{user?.name}</div>
                    </td>
                    <td>
                      <div className="text-center">{user?.points}</div>
                    </td>
                    <td>
                      <div className="text-center">{user?.level}</div>
                    </td>
                    <td>
                      <div className="text-center">{user?.user_id || 'Not Registered'}</div>
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

export default Leaderboard;
