/**
 * Header Component
 *
 * The main application header that contains the search bar,
 * theme toggle, language toggle, and notification button.
 */
"use client"

import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { useLanguage } from "./LanguageProvider"
import SearchBar from "./SearchBar"
import NotificationsDropdown from "./NotificationsDropdown"

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-card border-b border-border py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Site title */}
        <div className="md:ml-4">
          <h1 className="text-xl font-bold text-foreground">{t("app.name")}</h1>
        </div>

        {/* Header actions */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <SearchBar />

          {/* Language toggle */}
          <LanguageToggle />

          {/* Theme toggle button */}
          <ThemeToggle />

          {/* Notifications dropdown */}
          <NotificationsDropdown />
        </div>
      </div>
    </header>
  )
}

