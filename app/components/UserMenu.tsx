/**
 * UserMenu Component
 *
 * A dropdown menu for user-related actions like settings and logout.
 */
"use client"

import { useState } from "react"
import { User, LogOut, Settings } from "lucide-react"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* User menu toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-foreground hover:bg-accent/80 transition-colors"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="h-5 w-5" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-20 border border-border"
          onBlur={() => setIsOpen(false)}
        >
          {/* User info section */}
          <div className="px-4 py-2 border-b border-border">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>

          {/* Menu items */}
          <a href="/settings" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </a>
          <a href="/logout" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </a>
        </div>
      )}
    </div>
  )
}

