"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    // Load theme from database or localStorage
    const loadTheme = async () => {
      try {
        const { data } = await supabase.from("user_preferences").select("theme").eq("id", 1).single()

        if (data?.theme) {
          setThemeState(data.theme)
        }
      } catch (error) {
        // Fallback to localStorage
        const savedTheme = localStorage.getItem("theme") as Theme
        if (savedTheme) {
          setThemeState(savedTheme)
        }
      }
    }

    loadTheme()
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)

    try {
      // Save to database
      await supabase.from("user_preferences").update({ theme: newTheme }).eq("id", 1)
    } catch (error) {
      // Fallback to localStorage
      localStorage.setItem("theme", newTheme)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
