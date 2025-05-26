"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/contexts/ThemeContext"
import { BookOpen, CheckSquare, FileText, FolderOpen, Home, Moon, PenTool, Settings, Sun, Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Todos", href: "/todos", icon: CheckSquare },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Blog", href: "/blog", icon: PenTool },
  { name: "Books", href: "/books", icon: BookOpen },
  { name: "Projects", href: "/projects", icon: FolderOpen },
]

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col bg-card border-r border-border transition-all duration-300 z-10",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                MA
              </div>
              <div>
                <h1 className="text-lg font-bold">Mohd Asad</h1>
                <p className="text-xs text-muted-foreground">Software Developer</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    collapsed && "px-2",
                    isActive && "bg-primary/10 text-primary border-primary/20",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-2">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && (
              <div className="flex items-center gap-2 text-sm">
                <Sun className="h-4 w-4" />
                <span>Theme</span>
              </div>
            )}
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            {collapsed && <Moon className="h-4 w-4 text-muted-foreground" />}
          </div>

          <Link to="/settings">
            <Button variant="ghost" className={cn("w-full justify-start", collapsed && "px-2")}>
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
