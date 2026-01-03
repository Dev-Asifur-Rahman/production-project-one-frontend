"use client";
import CalenderSearch from "@/components/sub-components/dashboard/CalenderSearch";
import DashboardSearchBar from "@/components/sub-components/dashboard/DashboardSearchBar";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ClickedInfo = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("all");
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const fetchClickedData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/clicked_user_data?search=${search}&date=${date}&limit=${limit}`
      );
      const result = await res.json();
      setData(result.data || []);
    };

    fetchClickedData();
  }, [search, date, limit]);

  const exportToExcel = () => {
    const excelData = data.map((item) => ({
      Name: item.product_name,
      Company: item.company,
      Device: item.device,
      IP: item.geo?.ip || "",
      Time: new Date(item.date).toLocaleTimeString("en-BD", {
        timeZone: "Asia/Dhaka",
      }),
      Date: new Date(item.date).toLocaleDateString(),
      Country: item.geo?.country || "",
      "Time Zone": item.geo?.timezone || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clicked Data");
    XLSX.writeFile(workbook, "clicked_data.xlsx");
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto mb-20">
      <p className="font-bold text-3xl text-center my-5">Clicked Data</p>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
        <DashboardSearchBar setSearch={setSearch} />
        <CalenderSearch setDate={setDate} />
        <input
          type="number"
          className="input input-bordered w-32"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="Limit"
          min={1}
        />
      </div>

      {data.length === 0 ? (
        <p className="text-center">No Results Found</p>
      ) : (
        <section className="w-full">
          <p
            onClick={exportToExcel}
            className="text-lg my-4 text-green-600 hover:underline cursor-pointer"
          >
            Export as Sheet
          </p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="text-center">Serial No</th>
                  <th>Name</th>
                  <th className="text-center">Company</th>
                  <th>Device</th>
                  <th className="text-center">IP</th>
                  <th className="text-center">Time</th>
                  <th>Date</th>
                  <th>Country</th>
                  <th>Time Zone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <th className="text-center">{index + 1}</th>
                    <td>
                      <div className="line-clamp-2">{item.product_name}</div>
                    </td>
                    <td className="text-center">{item.company}</td>
                    <td>{item.device}</td>
                    <td className="text-center">{item.geo?.ip || ""}</td>
                    <td className="text-center whitespace-nowrap">
                      {new Date(item.date).toLocaleTimeString("en-BD", {
                        timeZone: "Asia/Dhaka",
                      })}
                    </td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.geo?.country || ""}</td>
                    <td>{item.geo?.timezone || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default ClickedInfo;
