/**
 * Residents Page Component
 *
 * Displays a directory of community residents with search functionality.
 */
"use client"

import { useState } from "react"
import { Search, Mail, Phone, MapPin } from "lucide-react"
import PageHeader from "../components/PageHeader"

// Sample resident data
const residents = [
  {
    id: 1,
    name: "Sarah Johnson",
    unit: "A-101",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    moveInDate: "January 2022",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    unit: "B-205",
    email: "michael.c@example.com",
    phone: "(555) 234-5678",
    moveInDate: "March 2021",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    unit: "A-304",
    email: "emma.r@example.com",
    phone: "(555) 345-6789",
    moveInDate: "June 2022",
    isAdmin: false,
  },
]

export default function Residents() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter residents based on search term
  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.unit.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader title="Residents Directory" />

      {/* Search control */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or unit..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-input shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-lg font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-4 h-6 w-6 text-foreground" />
      </div>

      {/* List of residents */}
      <div className="space-y-5">
        {filteredResidents.map((resident) => (
          <div key={resident.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-5">
              {/* Resident avatar */}
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-foreground font-bold text-xl">
                  {resident.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>

              {/* Resident details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-xl font-bold">{resident.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm px-3 py-1 rounded-full bg-accent font-bold">Unit {resident.unit}</span>
                    {resident.isAdmin && (
                      <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">Admin</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-foreground font-medium">
                    <Mail className="h-5 w-5 mr-3 text-foreground" />
                    <span>{resident.email}</span>
                  </div>
                  <div className="flex items-center text-foreground font-medium">
                    <Phone className="h-5 w-5 mr-3 text-foreground" />
                    <span>{resident.phone}</span>
                  </div>
                  <div className="flex items-center text-foreground font-medium">
                    <MapPin className="h-5 w-5 mr-3 text-foreground" />
                    <span>Moved in: {resident.moveInDate}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-primary hover:text-primary/80 font-bold text-lg">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

