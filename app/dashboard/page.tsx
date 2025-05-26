"use client"

import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckSquare, FileText, FolderOpen, PenTool, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  const quickActions = [
    {
      title: "New Todo",
      description: "Add a task to your list",
      icon: CheckSquare,
      href: "/dashboard/todos?new=true",
      color: "text-blue-500",
    },
    {
      title: "Write Note",
      description: "Capture your thoughts",
      icon: FileText,
      href: "/dashboard/notes?new=true",
      color: "text-green-500",
    },
    {
      title: "New Blog Post",
      description: "Start writing",
      icon: PenTool,
      href: "/dashboard/blog?new=true",
      color: "text-purple-500",
    },
    {
      title: "Add Book",
      description: "Track your reading",
      icon: BookOpen,
      href: "/dashboard/books?new=true",
      color: "text-orange-500",
    },
    {
      title: "New Project",
      description: "Start something new",
      icon: FolderOpen,
      href: "/dashboard/projects?new=true",
      color: "text-red-500",
    },
  ]

  const stats = [
    { label: "Active Todos", value: "12", change: "+2" },
    { label: "Notes", value: "45", change: "+5" },
    { label: "Blog Posts", value: "8", change: "+1" },
    { label: "Books Reading", value: "3", change: "0" },
    { label: "Active Projects", value: "4", change: "+1" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}!
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your content today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into creating new content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50"
                  >
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                    <div className="text-center">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>Your latest thoughts and ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Project Ideas</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No recent notes</p>
                  <Link href="/dashboard/notes?new=true">
                    <Button variant="link" size="sm">
                      Create your first note
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>What needs your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No upcoming tasks</p>
                  <Link href="/dashboard/todos?new=true">
                    <Button variant="link" size="sm">
                      Add your first todo
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
