/**
 * Sidebar Component
 *
 * The main navigation sidebar for the application.
 * Includes responsive behavior for mobile devices.
 */
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Bell, MessageSquare, Calendar, FileText, Users, Menu, X } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

export default function Sidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Navigation menu items configuration
  const menuItems = [
    { icon: Home, text: t("nav.home"), href: "/" },
    { icon: Bell, text: t("nav.notices"), href: "/notices" },
    { icon: Calendar, text: t("nav.events"), href: "/events" },
    { icon: MessageSquare, text: t("nav.discussions"), href: "/discussions" },
    { icon: FileText, text: t("nav.documents"), href: "/documents" },
    { icon: Users, text: t("nav.residents"), href: "/residents" },
  ]

  // Helper function to determine if a menu item is active
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-card shadow-md text-foreground"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar container */}
      <div
        className={`bg-card border-r border-border w-72 flex-shrink-0 flex flex-col z-20
        fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo and site name - LOGO NOT AFFECTED BY THEME */}
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-20 h-20 overflow-hidden rounded-full border border-border">
              <Image
                src="/images/hemmio-logo.png"
                alt="Hemmio Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-foreground">{t("app.name")}</span>
          </Link>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className={`flex items-center py-3 px-4 rounded-lg text-lg transition-colors font-bold
                    ${isActive(item.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-6 h-6 mr-4" />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-foreground font-bold text-lg">
              JD
            </div>
            <div>
              <p className="font-bold text-foreground">John Doe</p>
              <p className="text-sm text-foreground">{t("user.role.resident")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

