import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

async function getBooks() {
  const { data: books, error } = await supabase.from("books").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching books:", error)
    return []
  }

  return books || []
}

async function getBookStats() {
  const { data: books } = await supabase.from("books").select("*")

  if (!books) return { total: 0, completed: 0, reading: 0, categories: 0 }

  const completed = books.filter((book) => book.status === "completed").length
  const reading = books.filter((book) => book.status === "reading").length
  const categories = new Set(books.map((book) => book.author)).size

  return {
    total: books.length,
    completed,
    reading,
    categories,
  }
}

function BookCard({ book }: { book: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <img
          src={book.cover_image_url || "/placeholder.svg?height=400&width=300"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant="secondary" className="text-xs">
            {book.author}
          </Badge>
          {book.rating && (
            <Badge variant="default" className="text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {book.rating}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge
            variant={book.status === "completed" ? "default" : book.status === "reading" ? "secondary" : "outline"}
            className="text-xs"
          >
            {book.status.replace("_", " ")}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>

      <CardContent>
        {book.notes && <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{book.notes}</p>}

        <div className="space-y-2 text-xs text-muted-foreground">
          {book.pages_total && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{book.pages_total} pages</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Added {new Date(book.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function BooksPage() {
  const books = await getBooks()
  const stats = await getBookStats()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">My Digital Library</h1>
        <p className="text-muted-foreground text-lg">
          A curated collection of books that have shaped my understanding of technology and software development.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Books</div>
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
            <div className="text-2xl font-bold">{stats.reading}</div>
            <div className="text-sm text-muted-foreground">Currently Reading</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.categories}</div>
            <div className="text-sm text-muted-foreground">Authors</div>
          </CardContent>
        </Card>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">The library is being updated with new books.</p>
        </div>
      )}
    </div>
  )
}
