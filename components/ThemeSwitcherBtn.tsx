"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcherBtn() {
  const { theme, setTheme } = useTheme()

  const handleSetTheme = (t: string) => {
    // Log the intent so we can confirm clicks reach this handler
    console.log("ThemeSwitcherBtn: setting theme ->", t, "current theme:", theme)

    // setTheme may be undefined or a function depending on runtime; guard it
    if (typeof setTheme === "function") {
      // call in a try/catch to avoid uncaught runtime errors
      try {
        setTheme(t)
      } catch (err) {
        console.error("ThemeSwitcherBtn: setTheme threw:", err)
      }
    } else {
      console.warn("ThemeSwitcherBtn: setTheme is not available", setTheme)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}