import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"
import { LanguageProvider } from "./components/LanguageProvider"
import MobileNav from "./components/MobileNav"
import type React from "react"

// Load Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Define metadata for the application
export const metadata: Metadata = {
  title: "Hemmio | Community Connect",
  description: "Enhancing apartment community engagement",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex h-screen">
              {/* Sidebar navigation */}
              <Sidebar />

              {/* Main content area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background px-6 py-6 pb-20 md:pb-6">
                  {children}
                </main>

                {/* Mobile navigation */}
                <MobileNav />
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'