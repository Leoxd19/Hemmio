/**
 * LanguageProvider Component
 *
 * Manages the application's language state (Swedish/English) and provides
 * language context to child components. Handles language persistence via localStorage.
 */
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Define the possible language values
type Language = "sv" | "en"

// Props for the LanguageProvider component
type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

// Context state type definition
type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Translations
const translations = {
  sv: {
    // General
    "app.name": "Hemmio",
    "app.tagline": "Din gemenskapshub för lägenhetsboende",

    // Navigation
    "nav.home": "Hem",
    "nav.notices": "Meddelanden",
    "nav.events": "Evenemang",
    "nav.discussions": "Diskussioner",
    "nav.documents": "Dokument",
    "nav.residents": "Boende",

    // User
    "user.role.resident": "Boende",

    // Actions
    "action.view.all": "Visa alla",
    "action.search": "Sök...",
    "action.send.message": "Skicka meddelande",
    "action.rsvp": "Anmäl dig till evenemang",
    "action.join.discussion": "Delta i diskussion",
    "action.view": "Visa",
    "action.download": "Ladda ner",
    "action.create.event": "Skapa evenemang",
    "action.new.discussion": "Ny diskussion",

    // Welcome Card
    "welcome.title": "Välkommen till Hemmio",
    "welcome.description":
      "Din gemenskapshub för lägenhetsboende. Håll kontakten med grannar, hitta lokala evenemang och få tillgång till viktig gemenskapsinformation.",

    // Quick Links
    "quicklinks.title": "Snabblänkar",
    "quicklinks.notices.title": "Meddelanden",
    "quicklinks.notices.description": "Viktiga gemenskapsmeddelanden",
    "quicklinks.events.title": "Evenemang",
    "quicklinks.events.description": "Gemenskapsaktiviteter och sammankomster",
    "quicklinks.discussions.title": "Diskussioner",
    "quicklinks.discussions.description": "Anslut med dina grannar",
    "quicklinks.documents.title": "Dokument",
    "quicklinks.documents.description": "Få tillgång till gemenskapsresurser",

    // Events
    "events.title": "Kommande evenemang",
    "events.community.bbq": "Gemenskapsgrill",
    "events.residents.meeting": "Boendemöte",
    "events.location.courtyard": "Innergården",
    "events.location.community.room": "Gemenskapsrummet",

    // Notices
    "notices.title": "Senaste meddelanden",
    "notices.water.shutdown": "Vattenavstängning",
    "notices.recycling.guidelines": "Nya återvinningsriktlinjer",
    "notices.category.maintenance": "Underhåll",
    "notices.category.information": "Information",

    // Page Headers
    "page.notices": "Gemenskapsmeddelanden",
    "page.events": "Gemenskapsevenemang",
    "page.discussions": "Gemenskapsdiskussioner",
    "page.documents": "Gemenskapsdokument",
    "page.residents": "Boendeförteckning",

    // Filter
    "filter.all.categories": "Alla kategorier",
    "filter.search.notices": "Sök meddelanden...",
    "filter.search.events": "Sök evenemang...",
    "filter.search.discussions": "Sök diskussioner...",
    "filter.search.documents": "Sök dokument...",
    "filter.search.residents": "Sök efter namn eller lägenhet...",

    // Language
    "language.english": "Engelska",
    "language.swedish": "Svenska",

    // Theme
    "theme.light": "Ljust",
    "theme.dark": "Mörkt",

    // Attending
    attending: "deltar",

    // Search
    "search.open": "Öppna sök",
    "search.close": "Stäng",
    "search.placeholder": "Sök i Hemmio...",
    "search.clear": "Rensa sökning",
    "search.results": "Sökresultat",
    "search.no.results": "Inga resultat hittades",
    "search.start.typing": "Börja skriva för att söka",

    // Notifications
    "notifications.title": "Meddelanden",
    "notifications.mark.all.read": "Markera alla som lästa",
    "notifications.read": "Läs",
    "notifications.empty": "Inga meddelanden",
    "notifications.view.all": "Visa alla meddelanden",
    "notifications.aria.label": "Meddelanden",
    "notifications.aria.mark.read": "Markera som läst",
    "notifications.aria.dismiss": "Ta bort",
    "notifications.water.shutdown": "Vattenavstängning imorgon",
    "notifications.new.event": "Nytt evenemang: Gemenskapsgrill",
    "notifications.maintenance.complete": "Underhåll slutfört",
  },
  en: {
    // General
    "app.name": "Hemmio",
    "app.tagline": "Your community hub for apartment living",

    // Navigation
    "nav.home": "Home",
    "nav.notices": "Notices",
    "nav.events": "Events",
    "nav.discussions": "Discussions",
    "nav.documents": "Documents",
    "nav.residents": "Residents",

    // User
    "user.role.resident": "Resident",

    // Actions
    "action.view.all": "View all",
    "action.search": "Search...",
    "action.send.message": "Send Message",
    "action.rsvp": "RSVP to Event",
    "action.join.discussion": "Join Discussion",
    "action.view": "View",
    "action.download": "Download",
    "action.create.event": "Create Event",
    "action.new.discussion": "New Discussion",

    // Welcome Card
    "welcome.title": "Welcome to Hemmio",
    "welcome.description":
      "Your community hub for apartment living. Stay connected with neighbors, find local events, and access important community information.",

    // Quick Links
    "quicklinks.title": "Quick Links",
    "quicklinks.notices.title": "Notices",
    "quicklinks.notices.description": "Important community announcements",
    "quicklinks.events.title": "Events",
    "quicklinks.events.description": "Community activities and gatherings",
    "quicklinks.discussions.title": "Discussions",
    "quicklinks.discussions.description": "Connect with your neighbors",
    "quicklinks.documents.title": "Documents",
    "quicklinks.documents.description": "Access community resources",

    // Events
    "events.title": "Upcoming Events",
    "events.community.bbq": "Community BBQ",
    "events.residents.meeting": "Residents Meeting",
    "events.location.courtyard": "Courtyard",
    "events.location.community.room": "Community Room",

    // Notices
    "notices.title": "Recent Notices",
    "notices.water.shutdown": "Water Shutdown Notice",
    "notices.recycling.guidelines": "New Recycling Guidelines",
    "notices.category.maintenance": "Maintenance",
    "notices.category.information": "Information",

    // Page Headers
    "page.notices": "Community Notices",
    "page.events": "Community Events",
    "page.discussions": "Community Discussions",
    "page.documents": "Community Documents",
    "page.residents": "Residents Directory",

    // Filter
    "filter.all.categories": "All categories",
    "filter.search.notices": "Search notices...",
    "filter.search.events": "Search events...",
    "filter.search.discussions": "Search discussions...",
    "filter.search.documents": "Search documents...",
    "filter.search.residents": "Search by name or unit...",

    // Language
    "language.english": "English",
    "language.swedish": "Swedish",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",

    // Attending
    attending: "attending",

    // Search
    "search.open": "Open search",
    "search.close": "Close",
    "search.placeholder": "Search in Hemmio...",
    "search.clear": "Clear search",
    "search.results": "Search results",
    "search.no.results": "No results found",
    "search.start.typing": "Start typing to search",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.mark.all.read": "Mark all as read",
    "notifications.read": "Read",
    "notifications.empty": "No notifications",
    "notifications.view.all": "View all notifications",
    "notifications.aria.label": "Notifications",
    "notifications.aria.mark.read": "Mark as read",
    "notifications.aria.dismiss": "Dismiss",
    "notifications.water.shutdown": "Water shutdown tomorrow",
    "notifications.new.event": "New event: Community BBQ",
    "notifications.maintenance.complete": "Maintenance completed",
  },
}

// Initial context state
const initialState: LanguageProviderState = {
  language: "sv",
  setLanguage: () => null,
  t: (key: string) => key,
}

// Create the context
const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

/**
 * LanguageProvider component that manages language state and persistence
 */
export function LanguageProvider({ children, defaultLanguage = "sv" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("hemmio-language") as Language | null
    if (savedLanguage && (savedLanguage === "sv" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hemmio-language", language)
  }, [language])

  return (
    <LanguageProviderContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageProviderContext.Provider>
  )
}

/**
 * Custom hook to access the language context
 * Must be used within a LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

