"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, Calendar, Clock, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

async function getTodos() {
  const { data: todos, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching todos:", error)
    return []
  }

  return todos || []
}

async function getTodoStats() {
  const { data: todos } = await supabase.from("todos").select("*")

  if (!todos) return { total: 0, completed: 0, pending: 0, overdue: 0 }

  const completed = todos.filter((todo) => todo.completed).length
  const pending = todos.filter((todo) => !todo.completed).length
  const overdue = todos.filter(
    (todo) => !todo.completed && todo.due_date && new Date(todo.due_date) < new Date(),
  ).length

  return {
    total: todos.length,
    completed,
    pending,
    overdue,
  }
}

function TodoCard({ todo }: { todo: any }) {
  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed

  return (
    <Card className={`hover:shadow-lg transition-shadow ${todo.completed ? "opacity-75" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className={`text-lg flex items-center gap-2 ${todo.completed ? "line-through" : ""}`}>
              <CheckSquare className={`h-4 w-4 ${todo.completed ? "text-green-500" : "text-muted-foreground"}`} />
              {todo.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  todo.priority === "high" ? "destructive" : todo.priority === "medium" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {todo.priority} priority
              </Badge>
              {todo.category && (
                <Badge variant="outline" className="text-xs">
                  {todo.category}
                </Badge>
              )}
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {todo.description && <p className="text-sm text-muted-foreground">{todo.description}</p>}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created {formatDate(todo.created_at)}</span>
            </div>
            {todo.due_date && (
              <div className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : ""}`}>
                <Clock className="h-3 w-3" />
                <span>Due {formatDate(todo.due_date)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function TodosPage() {
  const todos = await getTodos()
  const stats = await getTodoStats()

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Todos</h1>
          <p className="text-muted-foreground text-lg">Task management and productivity tracking.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
        </div>

        {/* Todos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No todos found</h3>
            <p className="text-muted-foreground">Tasks will be added soon.</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
