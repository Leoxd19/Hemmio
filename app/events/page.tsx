/**
 * Events Page Component
 *
 * Displays a list of community events with filtering options.
 * Events can be filtered by search term or category.
 */
"use client"

import { useState } from "react"
import { Search, Calendar, MapPin, Clock, Users } from "lucide-react"
import PageHeader from "../components/PageHeader"
import { useLanguage } from "../components/LanguageProvider"

export default function Events() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Sample event data
  const events = [
    {
      id: 1,
      name: t("events.community.bbq"),
      date: "July 15, 2023",
      time: "4:00 PM - 7:00 PM",
      location: t("events.location.courtyard"),
      description:
        "Join us for our monthly community BBQ. Food and drinks will be provided. Bring a side dish to share if you'd like!",
      attendees: 24,
      category: "Social",
    },
    {
      id: 2,
      name: t("events.residents.meeting"),
      date: "July 10, 2023",
      time: "6:30 PM - 8:00 PM",
      location: t("events.location.community.room"),
      description: "Monthly residents meeting to discuss community updates, concerns, and upcoming projects.",
      attendees: 35,
      category: "Meeting",
    },
    {
      id: 3,
      name: "Gardening Workshop",
      date: "July 8, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Rooftop Garden",
      description: "Learn about urban gardening techniques and help plant our new community herb garden.",
      attendees: 12,
      category: "Workshop",
    },
  ]

  // Filter events based on search term and selected category
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || event.category === selectedCategory),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title={t("page.events")}
        action={{
          label: t("action.create.event"),
          href: "/events/create",
        }}
      />

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("filter.search.events")}
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
          <option value="Social">Social</option>
          <option value="Meeting">Meeting</option>
          <option value="Workshop">Workshop</option>
        </select>
      </div>

      {/* List of events */}
      <div className="space-y-5">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-5">
              {/* Event icon */}
              <div className="bg-primary/10 rounded-full p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>

              {/* Event content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-accent self-start font-bold">
                    {event.category}
                  </span>
                </div>
                <p className="mt-3 text-foreground text-lg font-medium">{event.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-foreground font-medium">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>
                      {event.date}, {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-foreground font-medium">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-foreground font-medium">
                    <Users className="h-5 w-5 mr-2" />
                    <span>
                      {event.attendees} {t("attending")}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-bold">
                    {t("action.rsvp")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

