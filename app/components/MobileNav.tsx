/**
 * MobileNav Component
 *
 * A mobile-specific navigation bar that appears at the bottom of the screen
 * on small devices. Provides quick access to key sections of the app.
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Bell, MessageSquare, Search } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

export default function MobileNav() {
  const { t } = useLanguage()
  const pathname = usePathname()

  // Helper function to determine if a nav item is active
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
      <nav className="flex justify-around">
        {/* Home link */}
        <Link
          href="/"
          className={`flex flex-col items-center py-3 px-5 ${isActive("/") ? "text-primary font-bold" : "text-foreground font-medium"}`}
          aria-label={t("nav.home")}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">{t("nav.home")}</span>
        </Link>

        {/* Events link */}
        <Link
          href="/events"
          className={`flex flex-col items-center py-3 px-5 ${isActive("/events") ? "text-primary font-bold" : "text-foreground font-medium"}`}
          aria-label={t("nav.events")}
        >
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">{t("nav.events")}</span>
        </Link>

        {/* Notices link */}
        <Link
          href="/notices"
          className={`flex flex-col items-center py-3 px-5 ${isActive("/notices") ? "text-primary font-bold" : "text-foreground font-medium"}`}
          aria-label={t("nav.notices")}
        >
          <Bell className="h-6 w-6" />
          <span className="text-xs mt-1">{t("nav.notices")}</span>
        </Link>

        {/* Discussions link */}
        <Link
          href="/discussions"
          className={`flex flex-col items-center py-3 px-5 ${isActive("/discussions") ? "text-primary font-bold" : "text-foreground font-medium"}`}
          aria-label={t("nav.discussions")}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">{t("nav.discussions")}</span>
        </Link>

        {/* Search button */}
        <button
          onClick={() => document.dispatchEvent(new Event("open-search"))}
          className="flex flex-col items-center py-3 px-5 text-foreground font-medium"
          aria-label={t("search.open")}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">{t("action.search")}</span>
        </button>
      </nav>
    </div>
  )
}

