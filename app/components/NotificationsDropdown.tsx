/**
 * NotificationsDropdown Component
 *
 * A dropdown menu for notifications that appears when clicking the bell icon.
 */
"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { useLanguage } from "./LanguageProvider"

interface Notification {
  id: number
  title: string
  time: string
  read: boolean
}

export default function NotificationsDropdown() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: t("notifications.water.shutdown"),
      time: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: t("notifications.new.event"),
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: t("notifications.maintenance.complete"),
      time: "2 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="relative">
      {/* Notification bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-foreground hover:bg-accent transition-colors relative"
        aria-label={t("notifications.aria.label")}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 h-5 w-5 bg-primary rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
            aria-hidden="true"
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg py-1 z-20 border border-border"
          onBlur={() => setIsOpen(false)}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-foreground">{t("notifications.title")}</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-sm text-primary hover:text-primary/80 font-medium">
                {t("notifications.mark.all.read")}
              </button>
            )}
          </div>

          {/* Notifications list */}
          {notifications.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-border last:border-0 flex justify-between ${
                    notification.read ? "opacity-70" : "bg-accent/30"
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <p className={`text-sm text-foreground ${!notification.read && "font-bold"}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-primary hover:text-primary/80"
                        aria-label={t("notifications.aria.mark.read")}
                      >
                        {t("notifications.read")}
                      </button>
                    )}
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={t("notifications.aria.dismiss")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <p>{t("notifications.empty")}</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border">
            <button
              className="text-sm text-primary hover:text-primary/80 font-medium w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              {t("notifications.view.all")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

