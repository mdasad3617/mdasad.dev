import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

// Mock data for when Supabase is not configured
const mockStats = {
  books: 12,
  blogPosts: 8,
  projects: 6,
  notes: 24,
}

const mockFeaturedContent = {
  books: [
    {
      id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      status: "completed",
      rating: 4.8,
      notes: "Essential reading for any software developer. Great insights on writing maintainable code.",
    },
  ],
  blogPosts: [
    {
      id: "1",
      title: "Building Scalable Microservices with NestJS",
      slug: "building-scalable-microservices-nestjs",
      excerpt: "Learn how to architect and build enterprise-grade microservices using NestJS framework.",
      tags: ["NestJS", "Microservices", "Node.js"],
      published_at: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns for Backend Development",
      slug: "advanced-typescript-patterns-backend",
      excerpt: "Explore advanced TypeScript patterns that can improve your backend development workflow.",
      tags: ["TypeScript", "Backend", "Patterns"],
      published_at: "2024-01-10T10:00:00Z",
    },
    {
      id: "3",
      title: "Optimizing Database Performance in Enterprise Applications",
      slug: "optimizing-database-performance-enterprise",
      excerpt: "Best practices for optimizing database performance in large-scale enterprise applications.",
      tags: ["Database", "Performance", "PostgreSQL"],
      published_at: "2024-01-05T10:00:00Z",
    },
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Microservices Platform",
      description: "Scalable e-commerce platform built with microservices architecture",
      tech_stack: ["NestJS", "PostgreSQL", "Redis", "Docker"],
      repository_url: "https://github.com/mohdasad/ecommerce-platform",
      live_url: "https://ecommerce-demo.mohdasad.dev",
      created_at: "2023-06-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Real-time Chat Application",
      description: "WebSocket-based chat application with real-time messaging",
      tech_stack: ["Node.js", "Socket.io", "React", "MongoDB"],
      repository_url: "https://github.com/mohdasad/realtime-chat",
      live_url: "https://chat.mohdasad.dev",
      created_at: "2023-08-15T00:00:00Z",
    },
    {
      id: "3",
      name: "Task Management API",
      description: "RESTful API for task management with advanced features",
      tech_stack: ["NestJS", "TypeORM", "PostgreSQL", "Swagger"],
      repository_url: "https://github.com/mohdasad/task-management-api",
      created_at: "2024-01-01T00:00:00Z",
    },
  ],
  notes: [
    {
      id: "1",
      title: "NestJS Best Practices for 2024",
      created_at: "2024-01-20T00:00:00Z",
      category: "Development",
    },
    {
      id: "2",
      title: "PostgreSQL Performance Optimization Tips",
      created_at: "2024-01-18T00:00:00Z",
      category: "Database",
    },
    {
      id: "3",
      title: "TypeScript Advanced Patterns",
      created_at: "2024-01-15T00:00:00Z",
      category: "Development",
    },
  ],
}

const deepDiveTopics = [
  {
    title: "An Introduction to GraphQL",
    icon: "🔗",
    color: "from-pink-500 to-purple-600",
  },
  {
    title: "How to Structure and Organize a React Application",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "How to Set Up webpack 5 From Scratch",
    icon: "📦",
    color: "from-green-500 to-teal-600",
  },
  {
    title: "The Event Loop, Callbacks, Promises, and Async/Await in JavaScript",
    icon: "🔄",
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "How to Use Redux and React",
    icon: "🔄",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "How to Set up a Mac for Development",
    icon: "🍎",
    color: "from-gray-500 to-gray-700",
  },
  {
    title: "A Complete Guide to CSS Concepts and Fundamentals",
    icon: "🎨",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "How to Use Vue, the JavaScript Framework",
    icon: "💚",
    color: "from-green-400 to-green-600",
  },
  {
    title: "Everything I Know as a Software Developer Without a Degree (2019)",
    icon: "🎓",
    color: "from-blue-600 to-indigo-700",
  },
  {
    title: "How to Use React, the JavaScript Framework",
    icon: "⚛️",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Design for Developers: Specific Steps to Improve Your Website Design",
    icon: "🎨",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "How to Use the Command Line in Linux and macOS",
    icon: "💻",
    color: "from-gray-600 to-gray-800",
  },
]

async function getStats() {
  const supabase = getSupabase()

  if (!supabase) {
    return mockStats
  }

  try {
    const [booksResult, blogResult, projectsResult, notesResult] = await Promise.all([
      supabase.from("books").select("id", { count: "exact" }),
      supabase.from("blog_posts").select("id", { count: "exact" }).eq("status", "published"),
      supabase.from("projects").select("id", { count: "exact" }),
      supabase.from("notes").select("id", { count: "exact" }),
    ])

    return {
      books: booksResult.count || 0,
      blogPosts: blogResult.count || 0,
      projects: projectsResult.count || 0,
      notes: notesResult.count || 0,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return mockStats
  }
}

async function getFeaturedContent() {
  const supabase = getSupabase()

  if (!supabase) {
    return mockFeaturedContent
  }

  try {
    const [booksResult, blogResult, projectsResult, notesResult] = await Promise.all([
      supabase.from("books").select("*").eq("status", "completed").order("rating", { ascending: false }).limit(3),
      supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3),
      supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(6),
      supabase.from("notes").select("*").order("created_at", { ascending: false }).limit(3),
    ])

    return {
      books: booksResult.data || mockFeaturedContent.books,
      blogPosts: blogResult.data || mockFeaturedContent.blogPosts,
      projects: projectsResult.data || mockFeaturedContent.projects,
      notes: notesResult.data || mockFeaturedContent.notes,
    }
  } catch (error) {
    console.error("Error fetching featured content:", error)
    return mockFeaturedContent
  }
}

export default async function HomePage() {
  const stats = await getStats()
  const featured = await getFeaturedContent()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border p-6 hidden lg:block">
          <div className="space-y-8">
            {/* About Me */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">About Me</h3>
              <div className="space-y-2 text-sm">
                <p>I'm Mohd Asad, software engineer and open-source creator. This is my digital garden. 🌱</p>
              </div>
            </div>

            {/* Stay Connected */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                Stay Connected
              </h3>
              <div className="space-y-2">
                <Link href="/newsletter" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  📧 Newsletter
                </Link>
                <Link
                  href="/starter-pack"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  🎁 Bluesky Starter Pack
                </Link>
                <Link href="/rss" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  📡 RSS Feed
                </Link>
              </div>
            </div>

            {/* Guides */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Guides</h3>
              <div className="space-y-2">
                <Link
                  href="/guides/macos-setup"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  🍎 macOS Setup for Devs
                </Link>
                <Link href="/guides/css" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  📚 CSS Guidebook
                </Link>
                <Link
                  href="/guides/react"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  ⚛️ React Architecture
                </Link>
                <Link
                  href="/guides/event-loop"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  🔄 The Event Loop
                </Link>
                <Link href="/topics" className="text-sm text-muted-foreground hover:text-foreground">
                  All Topics
                </Link>
              </div>
            </div>

            {/* Fun Stuff */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Fun Stuff</h3>
              <div className="space-y-2">
                <Link href="/lore" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  📖 The Lore of Animorphs
                </Link>
                <Link href="/pc-build" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                  🔧 Building My First PC
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-4xl">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">Hey, I'm Mohd Asad!</h1>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    I'm a software engineer, open-source creator, and former professional chef. I've been making
                    websites since 1998 and{" "}
                    <Link href="/blog" className="text-blue-400 hover:text-blue-300 underline">
                      writing on this blog
                    </Link>{" "}
                    for the past decade.
                  </p>
                  <p>
                    I enjoy weight-lifting, reading sci-fi and fantasy, playing retro video games, and spending time
                    with my partner and friends.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/developer-illustration.png"
                  alt="Developer illustration"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Notes</h2>
                <p className="text-muted-foreground">
                  Personal notes about life, music, projects, and everything else.
                </p>
              </div>
              <Link href="/notes" className="text-blue-400 hover:text-blue-300 text-sm">
                See All
              </Link>
            </div>
            <div className="space-y-3">
              {featured.notes.map((note) => (
                <div key={note.id} className="group">
                  <Link href={`/notes`} className="block">
                    <div className="flex items-center justify-between py-2 group-hover:bg-muted/50 rounded px-2 -mx-2 transition-colors">
                      <h3 className="text-blue-400 group-hover:text-blue-300">{note.title}</h3>
                      <span className="text-sm text-muted-foreground">{formatDate(note.created_at).split(",")[0]}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Articles Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Articles</h2>
                <p className="text-muted-foreground">Guides, references, and tutorials.</p>
              </div>
              <Link href="/blog" className="text-blue-400 hover:text-blue-300 text-sm">
                See All
              </Link>
            </div>
            <div className="space-y-3">
              {featured.blogPosts.map((post) => (
                <div key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-center justify-between py-2 group-hover:bg-muted/50 rounded px-2 -mx-2 transition-colors">
                      <h3 className="text-blue-400 group-hover:text-blue-300">{post.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.published_at || post.created_at).split(",")[0]}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Dives Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Deep Dives</h2>
                <p className="text-muted-foreground">Long-form tutorials on a variety of development topics.</p>
              </div>
              <Link href="/topics" className="text-blue-400 hover:text-blue-300 text-sm">
                All Topics
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deepDiveTopics.map((topic, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-muted"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-white text-sm flex-shrink-0`}
                      >
                        {topic.icon}
                      </div>
                      <h3 className="text-sm font-medium leading-tight group-hover:text-blue-400 transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="text-muted-foreground">Open-source projects I've worked on over the years.</p>
              </div>
              <Link href="/projects" className="text-blue-400 hover:text-blue-300 text-sm">
                All Projects
              </Link>
            </div>

            <div className="space-y-8">
              {/* Group projects by year */}
              {[2024, 2023].map((year) => {
                const yearProjects = featured.projects.filter(
                  (project) => new Date(project.created_at).getFullYear() === year,
                )

                if (yearProjects.length === 0) return null

                return (
                  <div key={year}>
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{year}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {yearProjects.map((project) => (
                        <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-blue-400 group-hover:text-blue-300">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="text-sm">{project.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex gap-2 mb-4">
                              {project.repository_url && (
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={project.repository_url} target="_blank">
                                    Article
                                  </Link>
                                </Button>
                              )}
                              {project.live_url && (
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={project.live_url} target="_blank">
                                    Demo
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
