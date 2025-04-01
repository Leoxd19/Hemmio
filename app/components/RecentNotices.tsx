/**
 * RecentNotices Component
 *
 * Displays a list of recent community notices with priority indicators
 * and categories.
 */
"use client"

import Link from "next/link"
import { Info, PenToolIcon as Tool } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

export default function RecentNotices() {
  const { t } = useLanguage()

  // Sample notice data
  const notices = [
    {
      id: 1,
      title: t("notices.water.shutdown"),
      date: "Jul 1",
      category: t("notices.category.maintenance"),
      icon: Tool,
      priority: "high",
    },
    {
      id: 2,
      title: t("notices.recycling.guidelines"),
      date: "Jun 28",
      category: t("notices.category.information"),
      icon: Info,
      priority: "medium",
    },
  ]

  return (
    <section className="bg-card rounded-lg p-6 shadow-sm border border-border">
      {/* Header with title and view all link */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{t("notices.title")}</h2>
        <Link href="/notices" className="text-primary hover:underline text-base font-bold">
          {t("action.view.all")}
        </Link>
      </div>

      {/* List of notices */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent">
            {/* Notice icon with priority-based styling */}
            <div
              className={`rounded-full p-3 ${
                notice.priority === "high"
                  ? "bg-destructive/10"
                  : notice.priority === "medium"
                    ? "bg-primary/10"
                    : "bg-secondary"
              }`}
            >
              <notice.icon
                className={`h-6 w-6 ${
                  notice.priority === "high"
                    ? "text-destructive"
                    : notice.priority === "medium"
                      ? "text-primary"
                      : "text-secondary-foreground"
                }`}
              />
            </div>

            {/* Notice details */}
            <div>
              <h3 className="font-bold text-lg">{notice.title}</h3>
              <div className="flex items-center justify-between text-foreground mt-2 font-medium">
                <span>{notice.date}</span>
                <span className="text-sm px-2 py-1 rounded-full bg-accent ml-3 font-bold">{notice.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

