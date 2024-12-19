"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";
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
