import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import ThemeRegistry from "@/components/theme-registry"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Public Facilities Finder",
  description: "Find nearby public facilities easily",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
