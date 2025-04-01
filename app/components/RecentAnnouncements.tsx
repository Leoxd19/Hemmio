import { Info, PenToolIcon as Tool } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    id: 1,
    title: "Water Shutdown Notice",
    date: "Jul 1",
    category: "Maintenance",
    icon: Tool,
    priority: "high",
  },
  {
    id: 2,
    title: "New Recycling Guidelines",
    date: "Jun 28",
    category: "Information",
    icon: Info,
    priority: "medium",
  },
  {
    id: 3,
    title: "Parking Lot Repainting",
    date: "Jun 25",
    category: "Maintenance",
    icon: Tool,
    priority: "medium",
  },
]

export default function RecentAnnouncements() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-neutral-900">Recent Notices</h2>
        <Link href="/announcements" className="text-sm text-amber-600 hover:text-amber-700">
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <announcement.icon
                className={`h-5 w-5 ${
                  announcement.priority === "high"
                    ? "text-red-500"
                    : announcement.priority === "medium"
                      ? "text-amber-500"
                      : "text-neutral-400"
                }`}
              />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">{announcement.title}</h3>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-neutral-500">{announcement.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
                  {announcement.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

