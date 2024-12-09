"use client";

import * as React from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        theme == "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      {theme == "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
}
