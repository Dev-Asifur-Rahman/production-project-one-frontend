"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ToggleLanguage = () => {
  const { lan, setLan } = useContext(LanguageContext);
  const router = useRouter()

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLan(savedLang);
    document.documentElement.setAttribute("data-lang", savedLang);
    const checkbox = document.getElementById("lang-toggle");
    if (checkbox) checkbox.checked = savedLang === "bn";
  }, [setLan]);

  const handleToggle = async (e) => {
    const isChecked = e.target.checked;
    const newLang = isChecked ? "bn" : "en";
    setLan(newLang);
    document.documentElement.setAttribute("data-lang", newLang);
    localStorage.setItem("lang", newLang);
    const response = await fetch("/api/cookies/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: newLang }),
    });
    const lang = await response.json();
    router.refresh()
  };
  return (
    <div className="flex items-center gap-1 text-white">
      <p>EN</p>
      <input
        id="lang-toggle"
        type="checkbox"
        className="toggle bg-transparent border-white text-white"
        checked={lan === "bn"}
        onChange={handleToggle}
      />
      <p>বাং</p>
    </div>
  );
};

export default ToggleLanguage;
