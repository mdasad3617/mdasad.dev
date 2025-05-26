import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, PenTool, FolderOpen, FileText, ExternalLink, Github, Mail, MapPin, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"

async function getStats() {
  const [booksResult, blogResult, projectsResult, notesResult] = await Promise.all([
    supabase.from("books").select("id", { count: "exact" }),
    supabase.from("blog_posts").select("id", { count: "exact" }).eq("status", "published"),
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("notes").select("id", { count: "exact" }).eq("is_favorite", true),
  ])

  return {
    books: booksResult.count || 0,
    blogPosts: blogResult.count || 0,
    projects: projectsResult.count || 0,
    notes: notesResult.count || 0,
  }
}

async function getFeaturedContent() {
  const [booksResult, blogResult, projectsResult] = await Promise.all([
    supabase.from("books").select("*").eq("status", "completed").order("rating", { ascending: false }).limit(3),
    supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3),
    supabase.from("projects").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(3),
  ])

  return {
    books: booksResult.data || [],
    blogPosts: blogResult.data || [],
    projects: projectsResult.data || [],
  }
}

export default async function HomePage() {
  const stats = await getStats()
  const featured = await getFeaturedContent()

  const skills = [
    "JavaScript",
    "TypeScript",
    "Node.js",
    "NestJS",
    "React",
    "Next.js",
    "PostgreSQL",
    "TypeORM",
    "Redis",
    "Docker",
    "Microservices",
    "WebSocket",
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>New Delhi, India</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Software Developer</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hey, I'm Mohd Asad! 👋
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Software Developer with 2+ years of expertise in enterprise application development. I specialize in
            building high-performance <strong>REST APIs</strong> and <strong>microservices</strong>
            using modern technologies.
          </p>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Currently at <strong>Sofyrus Technologies</strong>, I've led development of enterprise-grade systems
            achieving 40% faster API response times and 99.99% uptime. I enjoy architecting scalable solutions and
            building secure payment infrastructures.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/projects">
              <FolderOpen className="h-4 w-4 mr-2" />
              View Projects
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">
              <PenTool className="h-4 w-4 mr-2" />
              Read Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.books}</div>
            <div className="text-sm text-muted-foreground">Books</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <PenTool className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <div className="text-sm text-muted-foreground">Blog Posts</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{stats.projects}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <FileText className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{stats.notes}</div>
            <div className="text-sm text-muted-foreground">Notes</div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech_stack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech_stack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tech_stack.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.github_url && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.github_url} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button size="sm" asChild>
                      <Link href={project.live_url} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reading List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Currently Reading</h2>
          <Button variant="outline" asChild>
            <Link href="/books">
              View Library <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.books.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Reading</Badge>
                  {book.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{book.notes}</p>
                <Button size="sm" asChild>
                  <Link href={`/books`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
