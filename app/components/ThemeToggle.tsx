/**
 * ThemeToggle Component
 *
 * A modern, compact toggle button that switches between light and dark themes.
 */
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { useLanguage } from "./LanguageProvider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      aria-label={isDark ? t("theme.light") : t("theme.dark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
    >
      {isDark ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
    </button>
  )
}

