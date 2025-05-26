"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Moon, Sun, Github, Twitter, Search } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Search:", searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              MA
            </div>
            <span className="hidden font-bold sm:inline-block">mohdasad.dev</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Go
            </Button>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/notes"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              📝 Notes
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              📚 Blog
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              🚀 Projects
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              👋 About
            </Link>
          </nav>

          {/* Theme and Social */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/mohdasad" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://twitter.com/mohdasad" target="_blank">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
