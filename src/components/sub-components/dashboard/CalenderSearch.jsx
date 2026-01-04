"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import "cally";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";

const CalenderSearch = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const calendarRef = useRef(null);
  const {lan} = useContext(LanguageContext)

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      const handleChange = (e) => {
        const dateStr = e.target.value;
        if (!dateStr) return;

        const dateObj = new Date(dateStr);
        const isoString = dateObj.toISOString();

        setSelectedDate(isoString); 
        setDate(isoString); 
        setOpen(false);
      };

      calendar.addEventListener("change", handleChange);
      return () => calendar.removeEventListener("change", handleChange);
    }
  }, [setDate]);

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

  const displayDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-GB")
    : `${translation[lan].dashboard.clickedInfo.pick_a_date}`;

  return (
    <div className="w-full flex justify-center p-4 relative">
      <button
        id="cally1"
        className="input input-bordered relative z-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        {displayDate}
      </button>

      <div
        ref={popoverRef}
        popover
        id="cally-popover1"
        className={`dropdown bg-base-100 rounded-box shadow-lg mt-2 absolute z-[200] ${
          open ? "block" : "hidden"
        }`}
        style={{
          "--cally-anchor": "var(--cally1)",
          "--cally-position": "bottom",
          "--cally-alignment": "start",
        }}
      >
        <calendar-date ref={calendarRef} className="cally block p-2 mt-8">
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
