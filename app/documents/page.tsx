/**
 * Documents Page Component
 *
 * Displays a list of community documents with filtering options.
 * Documents can be filtered by search term or category.
 */
"use client"

import { useState } from "react"
import { Search, FileText, Download, Eye } from "lucide-react"
import PageHeader from "../components/PageHeader"

// Sample document data
const documents = [
  {
    id: 1,
    title: "Community Guidelines",
    description: "Official rules and guidelines for all residents",
    category: "Rules",
    date: "January 15, 2023",
    fileType: "PDF",
    fileSize: "1.2 MB",
  },
  {
    id: 2,
    title: "Maintenance Request Form",
    description: "Form to submit maintenance requests to building management",
    category: "Forms",
    date: "March 10, 2023",
    fileType: "PDF",
    fileSize: "0.8 MB",
  },
  {
    id: 3,
    title: "Parking Policy",
    description: "Information about parking spaces, guest parking, and regulations",
    category: "Rules",
    date: "February 5, 2023",
    fileType: "PDF",
    fileSize: "0.5 MB",
  },
]

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter documents based on search term and selected category
  const filteredDocuments = documents.filter(
    (document) =>
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || document.category === selectedCategory),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader title="Community Documents" />

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents..."
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
          <option value="All">All categories</option>
          <option value="Rules">Rules</option>
          <option value="Forms">Forms</option>
          <option value="Newsletter">Newsletter</option>
        </select>
      </div>

      {/* List of documents */}
      <div className="space-y-5">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-5">
              {/* Document icon */}
              <div className="bg-primary/10 rounded-full p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>

              {/* Document content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-xl font-bold">{document.title}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-accent self-start font-bold">
                    {document.category}
                  </span>
                </div>
                <p className="mt-3 text-foreground text-lg font-medium">{document.description}</p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-foreground font-medium">
                    {document.date} • {document.fileType} • {document.fileSize}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      className="flex items-center px-4 py-2 text-base bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-bold"
                      aria-label="View document"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      View
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-base bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-bold"
                      aria-label="Download document"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

