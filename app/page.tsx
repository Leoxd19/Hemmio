/**
 * Home Page Component
 *
 * The main dashboard page that displays a welcome message,
 * quick links, and recent community information.
 */
import WelcomeCard from "./components/WelcomeCard"
import QuickLinks from "./components/QuickLinks"
import UpcomingEvents from "./components/UpcomingEvents"
import RecentNotices from "./components/RecentNotices"

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome message */}
      <WelcomeCard />

      {/* Quick access links */}
      <QuickLinks />

      {/* Two-column layout for events and notices */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <UpcomingEvents />
        <RecentNotices />
      </div>
    </div>
  )
}

