import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getSupabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"
import { Calendar, Tag } from "lucide-react"
import Link from "next/link"

// Mock data for when Supabase is not configured
const mockPosts = [
  {
    id: "1",
    title: "Building Scalable Microservices with NestJS",
    slug: "building-scalable-microservices-nestjs",
    excerpt: "Learn how to architect and build enterprise-grade microservices using NestJS framework with TypeScript.",
    tags: ["NestJS", "Microservices", "Node.js", "TypeScript"],
    published_at: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns for Backend Development",
    slug: "advanced-typescript-patterns-backend",
    excerpt:
      "Explore advanced TypeScript patterns that can improve your backend development workflow and code quality.",
    tags: ["TypeScript", "Backend", "Patterns", "Node.js"],
    published_at: "2024-01-10T10:00:00Z",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "3",
    title: "Optimizing Database Performance in Enterprise Applications",
    slug: "optimizing-database-performance-enterprise",
    excerpt: "Best practices for optimizing database performance in large-scale enterprise applications.",
    tags: ["Database", "Performance", "PostgreSQL", "Optimization"],
    published_at: "2024-01-05T10:00:00Z",
    created_at: "2024-01-05T10:00:00Z",
  },
]

async function getBlogPosts() {
  const supabase = getSupabase()

  if (!supabase) {
    return mockPosts
  }

  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return mockPosts
    }

    return posts || mockPosts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return mockPosts
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Thoughts on software development, technology, and building great products.
          </p>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {post.excerpt && <CardDescription className="text-base">{post.excerpt}</CardDescription>}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3} more</Badge>}
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Blog Posts Yet</CardTitle>
            <CardDescription>Check back soon for new content!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No blog posts have been published yet.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
