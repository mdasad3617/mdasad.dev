import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/theme-context"
import { Header } from "@/components/layout/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohd Asad - Software Developer",
  description:
    "Personal content hub showcasing books, blog posts, projects, and technical notes by Mohd Asad, a software developer specializing in enterprise applications.",
  keywords: ["Software Developer", "NestJS", "TypeScript", "Microservices", "Node.js", "React"],
  authors: [{ name: "Mohd Asad" }],
  creator: "Mohd Asad",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
