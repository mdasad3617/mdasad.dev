"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { Moon, Sun, Github, Mail } from "lucide-react"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              MA
            </div>
            <span className="hidden font-bold sm:inline-block">Mohd Asad</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Blog
            </Link>
            <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Projects
            </Link>
            <Link href="/books" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Books
            </Link>
            <Link href="/notes" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Notes
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="mailto:contact@mohdasad.dev">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/mohdasad" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
