/**
 * ThemeProvider Component
 *
 * Manages the application's theme state (light/dark/system) and provides
 * theme context to child components. Handles theme persistence via localStorage
 * and applies the appropriate theme class to the document root.
 */
"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define the possible theme values
type Theme = "light" | "dark" | "system"

// Props for the ThemeProvider component
type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

// Context state type definition
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// Initial context state
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

// Create the context
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * ThemeProvider component that manages theme state and persistence
 */
export function ThemeProvider({ children, defaultTheme = "system" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Apply the theme class to the document root
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("hemmio-theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hemmio-theme", theme)
  }, [theme])

  return <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>
}

/**
 * Custom hook to access the theme context
 * Must be used within a ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

