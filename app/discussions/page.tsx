/**
 * Discussions Page Component
 *
 * Displays a list of community discussions with filtering options.
 * Discussions can be filtered by search term or category.
 */
"use client"

import { useState } from "react"
import { Search, MessageSquare, ThumbsUp, MessageCircle, User } from "lucide-react"
import PageHeader from "../components/PageHeader"

// Sample discussion data
const discussions = [
  {
    id: 1,
    title: "Ideas for improving the community garden",
    description: "I'd like to propose some new plants and seating areas for our community garden space.",
    author: "Sarah J.",
    date: "July 1",
    likes: 12,
    comments: 8,
    category: "Improvements",
  },
  {
    id: 2,
    title: "Organizing a community volunteer day",
    description: "Let's get together to clean up the neighborhood park and plant some trees.",
    author: "Michael C.",
    date: "June 28",
    likes: 24,
    comments: 15,
    category: "Events",
  },
  {
    id: 3,
    title: "Recommendations for local services",
    description: "Looking for recommendations for reliable plumbers and electricians in our area.",
    author: "Emma R.",
    date: "June 25",
    likes: 7,
    comments: 11,
    category: "Recommendations",
  },
]

export default function Discussions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter discussions based on search term and selected category
  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || discussion.category === selectedCategory),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Community Discussions"
        action={{
          label: "New Discussion",
          href: "/discussions/create",
        }}
      />

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search discussions..."
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
          <option value="Improvements">Improvements</option>
          <option value="Events">Events</option>
          <option value="Recommendations">Recommendations</option>
        </select>
      </div>

      {/* List of discussions */}
      <div className="space-y-5">
        {filteredDiscussions.map((discussion) => (
          <div key={discussion.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-5">
              {/* Discussion icon */}
              <div className="bg-primary/10 rounded-full p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>

              {/* Discussion content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-xl font-bold">{discussion.title}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-accent self-start font-bold">
                    {discussion.category}
                  </span>
                </div>
                <p className="mt-3 text-foreground text-lg font-medium">{discussion.description}</p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center text-foreground font-medium">
                    <User className="h-5 w-5 mr-2" />
                    {discussion.author} • {discussion.date}
                  </div>
                  <div className="flex items-center space-x-5">
                    <span className="flex items-center text-foreground font-medium">
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      {discussion.likes}
                    </span>
                    <span className="flex items-center text-foreground font-medium">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {discussion.comments}
                    </span>
                    <button className="text-primary hover:text-primary/80 font-bold">Join Discussion</button>
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

