"use client";

import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext(null);

const GlobalLanguageProvider = ({ children }) => {
  const [lan, setLan] = useState("en");

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = localStorage.getItem("lang") || "en";
      setLan(lang);
      document.documentElement.setAttribute("data-lang", lang);
      const response = await fetch('/api/cookies/language',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({lang})
      })
      const language = await response.json()
    };
    fetchLanguage()
  }, []);

  const object = {
    lan,
    setLan,
  };

  return (
    <LanguageContext.Provider value={object}>
      {children}
    </LanguageContext.Provider>
  );
};

export default GlobalLanguageProvider;
