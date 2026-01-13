"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Make sure this is installed: npm install xlsx

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

  const exportToExcel = () => {
    const excelData = risingStars.map((user, index) => ({
      Rank: index + 1,
      Name: user.name,
      "Monthly Point": user.monthly_point,
      Level: user.level,
      ID:
        user.user_id ||
        (lan === "en" ? "Not Registered" : "আইডি নিবন্ধিত নয়"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rising Stars");
    XLSX.writeFile(workbook, "rising_stars.xlsx");
  };

  const setRankColor = (rank) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-inherit";
  };

  return (
    <section className="w-full">
      {risingStars?.length === 0 ? (
        <p className="w-full text-center">No Data</p>
      ) : (
        <section className="w-full">
          <p
            onClick={exportToExcel}
            className="text-lg my-4 text-[#006A4E] hover:underline cursor-pointer"
          >
            {translation[lan].dashboard.clickedInfo.export_this_sheet}
          </p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-[#006A4E] dark:text-[#F42A41]">
                  <th className="text-center">{translation[lan].common.rank}</th>
                  <th>Name</th>
                  <th className="text-center">{translation[lan].common.monthly_point}</th>
                  <th className="text-center">{translation[lan].common.level}</th>
                  <th className="text-center">{translation[lan].common.id}</th>
                </tr>
              </thead>
              <tbody>
                {risingStars.map((user, index) => (
                  <tr key={index}>
                    <th className={`${setRankColor(index + 1)} text-center`}>
                      {index + 1}
                    </th>
                    <td>{user.name}</td>
                    <td className="text-center">{user.monthly_point}</td>
                    <td className="text-center">{user.level}</td>
                    <td className="text-center">
                      {user.user_id ||
                        (lan === "en" ? "Not Registered" : "আইডি নিবন্ধিত নয়")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
};

export default RisingStars;
