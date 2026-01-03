import type React from "react"
import type { Metadata } from "next"
import { Geist, Noto_Sans_Khmer } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-khmer",
})

export const metadata: Metadata = {
  title: "My Blog",
  description: "A minimal blog with Markdown support",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${notoSansKhmer.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
