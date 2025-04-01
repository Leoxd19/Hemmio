"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleOpen = () => {
    setIsOpen(true)
    // Focus on the input when the search bar opens
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`)
      handleClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Open search from mobile nav
  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOpen(true)
    }

    document.addEventListener("open-search", handleOpenSearch)
    return () => document.removeEventListener("open-search", handleOpenSearch)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="block md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Open Search"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close Search"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-8">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={searchInputRef}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

