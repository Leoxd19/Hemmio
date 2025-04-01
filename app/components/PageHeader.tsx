/**
 * PageHeader Component
 *
 * A reusable page header that displays a title and optional action button.
 * Used across different pages for consistent layout.
 */
"use client"

import Link from "next/link"
import { useLanguage } from "./LanguageProvider"

interface PageHeaderProps {
  title: string
  action?: {
    label: string
    href: string
  }
}

export default function PageHeader({ title, action }: PageHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-with-outline">{title}</h1>

      {/* Optional action button */}
      {action && (
        <Link
          href={action.href}
          className="px-5 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center text-lg font-bold"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

