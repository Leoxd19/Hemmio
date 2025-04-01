/**
 * WelcomeCard Component
 *
 * A welcome message displayed on the dashboard that introduces
 * users to the Hemmio platform.
 */
"use client"

import { useLanguage } from "./LanguageProvider"

export default function WelcomeCard() {
  const { t } = useLanguage()

  return (
    <section className="bg-card rounded-lg p-8 shadow-sm border border-border">
      <h1 className="text-2xl font-bold mb-3 text-with-outline">{t("welcome.title")}</h1>
      <p className="text-foreground text-lg font-medium">{t("welcome.description")}</p>
    </section>
  )
}

