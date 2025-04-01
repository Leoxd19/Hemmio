/**
 * QuickLinks Component
 *
 * Displays a grid of quick access links to key sections of the application.
 * Each link includes an icon and description.
 */
"use client"

import Link from "next/link"
import { Bell, Calendar, MessageSquare, FileText } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

export default function QuickLinks() {
  const { t } = useLanguage()

  // Configuration for quick links
  const links = [
    {
      name: t("quicklinks.notices.title"),
      description: t("quicklinks.notices.description"),
      icon: Bell,
      href: "/notices",
      color: "bg-primary/10 text-primary",
    },
    {
      name: t("quicklinks.events.title"),
      description: t("quicklinks.events.description"),
      icon: Calendar,
      href: "/events",
      color: "bg-primary/10 text-primary",
    },
    {
      name: t("quicklinks.discussions.title"),
      description: t("quicklinks.discussions.description"),
      icon: MessageSquare,
      href: "/discussions",
      color: "bg-primary/10 text-primary",
    },
    {
      name: t("quicklinks.documents.title"),
      description: t("quicklinks.documents.description"),
      icon: FileText,
      href: "/documents",
      color: "bg-primary/10 text-primary",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold mb-5">{t("quicklinks.title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-5 border border-border"
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center ${link.color}`}>
              <link.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{link.name}</h3>
              <p className="text-foreground font-medium mt-1">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

