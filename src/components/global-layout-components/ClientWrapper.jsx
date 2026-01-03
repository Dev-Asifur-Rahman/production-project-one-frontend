"use client";

import { useEffect, useState } from "react";

const ClientWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const setCookies = async () => {
      const res = await fetch("/api/cookies/set_cookies");
      const result = await res.json();
    };
    setCookies();
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return children;
};

export default ClientWrapper;
