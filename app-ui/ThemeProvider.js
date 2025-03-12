"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { applyTheme } from "@/helper";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("darkRed");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || "darkRed";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Ensure UI updates before setting loading false
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    Cookies.set("theme", newTheme, { expires: 365 });
    applyTheme(newTheme);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
