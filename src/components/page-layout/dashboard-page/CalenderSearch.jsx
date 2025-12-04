"use client";
import React, { useEffect, useState, useRef } from "react";
import "cally";

const CalenderSearch = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const calendar = document.querySelector("calendar-date");
    if (calendar) {
      const handleChange = (e) => {
        setSelectedDate(e.target.value);
        setOpen(false);
      };
      calendar.addEventListener("change", handleChange);
      return () => {
        calendar.removeEventListener("change", handleChange);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !event.target.closest("#cally1")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-center p-4 relative">
      <p>{selectedDate}</p>
      <button
        id="cally1"
        className="input input-bordered relative z-10"
        style={{ "--cally1": "true" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedDate || "Pick a date"}
      </button>

      <div
        ref={popoverRef}
        popover
        id="cally-popover1"
        className={`dropdown bg-base-100 rounded-box shadow-lg mt-2 absolute ${
          open ? "block" : "hidden"
        }`}
        style={{
          "--cally-anchor": "var(--cally1)",
          "--cally-position": "bottom",
          "--cally-alignment": "start",
        }}
      >
        <calendar-date className="cally block p-2 mt-8">
          <svg
            aria-label="Previous"
            className="fill-current w-6 h-6 cursor-pointer"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>

          <svg
            aria-label="Next"
            className="fill-current w-6 h-6 cursor-pointer"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>

          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>
  );
};

export default CalenderSearch;
