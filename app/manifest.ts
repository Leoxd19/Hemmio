/**
 * Application Manifest
 *
 * Defines the web app manifest for the HEMMIO application.
 * This provides metadata for when the app is installed on a device.
 */
import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HEMMIO Community Connect",
    short_name: "HEMMIO",
    description: "Enhancing apartment community engagement",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}

