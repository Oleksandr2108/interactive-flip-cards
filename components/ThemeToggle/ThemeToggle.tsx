"use client";

import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="rounded-full px-3 w-12 h-12 flex items-center justify-center cursor-pointer
      bg-[#e5e7eb] text-white text-sm shadow-sm transition hover:opacity-90 dark:bg-[#364153]"
      aria-label="Toggle theme"
    >
      {dark ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
