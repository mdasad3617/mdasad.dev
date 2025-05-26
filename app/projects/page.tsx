import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Github, ExternalLink, Calendar, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

async function getProjects() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return projects || []
}

async function getProjectStats() {
  const { data: projects } = await supabase.from("projects").select("*")

  if (!projects) return { total: 0, completed: 0, inProgress: 0, featured: 0 }

  const completed = projects.filter((project) => project.status === "completed").length
  const inProgress = projects.filter((project) => project.status === "in_progress").length
  const featured = projects.filter((project) => project.featured).length

  return {
    total: projects.length,
    completed,
    inProgress,
    featured,
  }
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          {project.featured && (
            <Badge variant="default">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.tech_stack.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech_stack.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech_stack.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  project.status === "completed"
                    ? "default"
                    : project.status === "in_progress"
                      ? "secondary"
                      : "outline"
                }
                className="text-xs"
              >
                {project.status.replace("_", " ")}
              </Badge>
              <span className="text-xs text-muted-foreground">{project.progress}% complete</span>
            </div>
          </div>

          <div className="flex gap-2">
            {project.repository_url && (
              <Button size="sm" variant="outline" asChild>
                <Link href={project.repository_url} target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
            {project.live_url && (
              <Button size="sm" asChild>
                <Link href={project.live_url} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const stats = await getProjectStats()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground text-lg">
          A showcase of my work in software development, from enterprise applications to personal experiments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.featured}</div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">Projects are being added soon.</p>
        </div>
      )}
    </div>
  )
}
