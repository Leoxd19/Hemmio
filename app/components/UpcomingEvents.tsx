/**
 * UpcomingEvents Component
 *
 * Displays a list of upcoming community events with details
 * like date, time, and location.
 */
"use client"

import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

export default function UpcomingEvents() {
  const { t } = useLanguage()

  // Sample event data
  const events = [
    {
      id: 1,
      name: t("events.community.bbq"),
      date: "Jul 15",
      time: "4:00 PM",
      location: t("events.location.courtyard"),
    },
    {
      id: 2,
      name: t("events.residents.meeting"),
      date: "Jul 10",
      time: "6:30 PM",
      location: t("events.location.community.room"),
    },
  ]

  return (
    <section className="bg-card rounded-lg p-6 shadow-sm border border-border">
      {/* Header with title and view all link */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{t("events.title")}</h2>
        <Link href="/events" className="text-primary hover:underline text-base font-bold">
          {t("action.view.all")}
        </Link>
      </div>

      {/* List of events */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent">
            {/* Event icon */}
            <div className="bg-primary/10 rounded-full p-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>

            {/* Event details */}
            <div>
              <h3 className="font-bold text-lg">{event.name}</h3>
              <div className="flex items-center text-foreground mt-2 font-medium">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {event.date}, {event.time}
                </span>
              </div>
              <div className="flex items-center text-foreground mt-1 font-medium">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

