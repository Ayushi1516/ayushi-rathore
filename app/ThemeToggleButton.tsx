"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center p-2.5 border border-border rounded-lg" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center p-2.5 border border-border rounded-lg text-muted hover:text-ink hover:border-teal transition-colors"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      {isDark ? (
        <FaSun className="w-full h-full" />
      ) : (
        <FaMoon className="w-full h-full" />
      )}
    </button>
  );
}