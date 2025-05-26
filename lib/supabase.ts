import { createClient } from "@supabase/supabase-js"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Only create client if we have real credentials
export const supabase = supabaseUrl.includes("placeholder") ? null : createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (only if we have service role key)
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          author: string
          isbn: string | null
          cover_image_url: string | null
          status: "want_to_read" | "reading" | "completed" | "abandoned"
          rating: number | null
          notes: string | null
          pages_total: number | null
          pages_read: number
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          author: string
          isbn?: string | null
          cover_image_url?: string | null
          status?: "want_to_read" | "reading" | "completed" | "abandoned"
          rating?: number | null
          notes?: string | null
          pages_total?: number | null
          pages_read?: number
          started_at?: string | null
          completed_at?: string | null
        }
        Update: {
          title?: string
          author?: string
          isbn?: string | null
          cover_image_url?: string | null
          status?: "want_to_read" | "reading" | "completed" | "abandoned"
          rating?: number | null
          notes?: string | null
          pages_total?: number | null
          pages_read?: number
          started_at?: string | null
          completed_at?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          cover_image_url: string | null
          status: "draft" | "published" | "archived"
          tags: string[]
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          cover_image_url?: string | null
          status?: "draft" | "published" | "archived"
          tags?: string[]
          published_at?: string | null
        }
        Update: {
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          cover_image_url?: string | null
          status?: "draft" | "published" | "archived"
          tags?: string[]
          published_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: "planning" | "in_progress" | "completed" | "on_hold" | "cancelled"
          priority: "low" | "medium" | "high"
          start_date: string | null
          end_date: string | null
          progress: number
          tags: string[]
          repository_url: string | null
          live_url: string | null
          tech_stack: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          status?: "planning" | "in_progress" | "completed" | "on_hold" | "cancelled"
          priority?: "low" | "medium" | "high"
          start_date?: string | null
          end_date?: string | null
          progress?: number
          tags?: string[]
          repository_url?: string | null
          live_url?: string | null
          tech_stack?: string[]
          featured?: boolean
        }
        Update: {
          name?: string
          description?: string | null
          status?: "planning" | "in_progress" | "completed" | "on_hold" | "cancelled"
          priority?: "low" | "medium" | "high"
          start_date?: string | null
          end_date?: string | null
          progress?: number
          tags?: string[]
          repository_url?: string | null
          live_url?: string | null
          tech_stack?: string[]
          featured?: boolean
        }
      }
      notes: {
        Row: {
          id: string
          title: string
          content: string
          tags: string[]
          category: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          content: string
          tags?: string[]
          category?: string | null
          is_favorite?: boolean
        }
        Update: {
          title?: string
          content?: string
          tags?: string[]
          category?: string | null
          is_favorite?: boolean
        }
      }
      todos: {
        Row: {
          id: string
          title: string
          description: string | null
          completed: boolean
          priority: "low" | "medium" | "high"
          due_date: string | null
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description?: string | null
          completed?: boolean
          priority?: "low" | "medium" | "high"
          due_date?: string | null
          category?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          completed?: boolean
          priority?: "low" | "medium" | "high"
          due_date?: string | null
          category?: string | null
        }
      }
      user_preferences: {
        Row: {
          id: number
          theme: "light" | "dark"
          google_drive_connected: boolean
          google_drive_refresh_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          theme?: "light" | "dark"
          google_drive_connected?: boolean
          google_drive_refresh_token?: string | null
        }
        Update: {
          theme?: "light" | "dark"
          google_drive_connected?: boolean
          google_drive_refresh_token?: string | null
        }
      }
    }
  }
}

// Helper function to safely use Supabase
export function getSupabase() {
  if (!supabase) {
    console.warn("Supabase not configured. Using mock data.")
    return null
  }
  return supabase
}
