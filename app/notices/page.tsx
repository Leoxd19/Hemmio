/**
 * Notices Page Component
 *
 * Displays a list of community notices with filtering options.
 * Notices can be filtered by search term or category.
 */
"use client"

import { useState } from "react"
import { Search, AlertCircle, Info, PenToolIcon as Tool } from "lucide-react"
import PageHeader from "../components/PageHeader"
import { useLanguage } from "../components/LanguageProvider"

export default function Notices() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Sample notice data
  const notices = [
    {
      id: 1,
      title: t("notices.water.shutdown"),
      date: "July 1, 2023",
      category: t("notices.category.maintenance"),
      icon: Tool,
      priority: "high",
      content:
        "Due to necessary pipe repairs, water will be shut off in Buildings A and B on July 5th from 10:00 AM to 2:00 PM. Please prepare accordingly.",
    },
    {
      id: 2,
      title: t("notices.recycling.guidelines"),
      date: "June 28, 2023",
      category: t("notices.category.information"),
      icon: Info,
      priority: "medium",
      content:
        "Please review the updated recycling guidelines. Glass and plastic must now be separated. New bins will be provided in the recycling area by July 1st.",
    },
    {
      id: 3,
      title: "Parking Lot Repainting",
      date: "June 25, 2023",
      category: t("notices.category.maintenance"),
      icon: Tool,
      priority: "medium",
      content:
        "The parking lot will be repainted on June 30th. Please remove all vehicles from 8:00 AM to 5:00 PM. Temporary parking will be available on Oak Street.",
    },
    {
      id: 4,
      title: "Fire Alarm Testing",
      date: "June 20, 2023",
      category: "Alert",
      icon: AlertCircle,
      priority: "high",
      content:
        "Mandatory fire alarm testing will take place on June 22nd from 9:00 AM to 11:00 AM. The alarms will sound intermittently during this period.",
    },
  ]

  // Filter notices based on search term and selected category
  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || notice.category === selectedCategory),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader title={t("page.notices")} />

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("filter.search.notices")}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-input shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-lg font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-4 h-6 w-6 text-foreground" />
        </div>
        <select
          className="px-4 py-3 rounded-lg bg-card border border-input shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-lg font-medium"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">{t("filter.all.categories")}</option>
          <option value={t("notices.category.maintenance")}>{t("notices.category.maintenance")}</option>
          <option value="Alert">Alert</option>
          <option value={t("notices.category.information")}>{t("notices.category.information")}</option>
        </select>
      </div>

      {/* List of notices */}
      <div className="space-y-5">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-5">
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

              {/* Notice content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-xl font-bold">{notice.title}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-accent self-start font-bold">
                    {notice.category}
                  </span>
                </div>
                <p className="mt-3 text-foreground text-lg font-medium">{notice.content}</p>
                <p className="mt-4 text-foreground font-medium">Posted on {notice.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

