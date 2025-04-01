/**
 * LanguageToggle Component
 *
 * A button that toggles between Swedish and English languages.
 */
"use client"

import { useLanguage } from "./LanguageProvider"

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "sv" ? "en" : "sv")}
      className="text-sm font-medium px-2 py-1 rounded-md border border-border hover:bg-accent transition-colors"
      aria-label={language === "sv" ? "Switch to English" : "Byt till svenska"}
    >
      {language === "sv" ? "EN" : "SV"}
    </button>
  )
}

