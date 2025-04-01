# HEMMIO Community Platform

HEMMIO is a modern web application designed to enhance apartment community engagement. It provides a centralized platform for residents to access community information, events, notices, discussions, and documents.

## Features

- **Light/Dark Theme**: Fully customizable theme with seamless transitions
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Community Notices**: Important announcements with priority indicators
- **Events Calendar**: Community events with RSVP functionality
- **Discussion Forums**: Resident discussions organized by categories
- **Document Repository**: Access to community documents and forms
- **Resident Directory**: Contact information for community members

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Deployment**: Vercel

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/components/` - Reusable UI components
- `app/globals.css` - Global styles and theme variables
- `public/` - Static assets like images and icons

## Key Components

- `ThemeProvider` - Manages light/dark theme state
- `Sidebar` - Main navigation with responsive behavior
- `Header` - App header with search and theme toggle
- `PageHeader` - Consistent page headers with actions
- `QuickLinks` - Dashboard quick access links
- `UpcomingEvents` - Event previews for the dashboard
- `RecentNotices` - Notice previews for the dashboard

## Customization

The application uses a custom color scheme based on a grayscale palette with subtle blue undertones. The primary accent color is amber.

Theme colors can be customized in `app/globals.css` by modifying the CSS variables in the `:root` and `.dark` selectors.

