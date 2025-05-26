"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookCard } from "@/components/BookCard"
import { PDFViewer } from "@/components/PDFViewer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Filter, Grid3X3, List, Star, Download, ExternalLink, RefreshCw } from "lucide-react"
import {
  fetchBooksFromDrive,
  getDirectDownloadLink,
  getEmbeddablePDFLink,
  type Book,
} from "@/services/googleDriveService"

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Load books from Google Drive
  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const booksData = await fetchBooksFromDrive()
      setBooks(booksData)
    } catch (error) {
      console.error("Error loading books:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", ...new Set(books.map((book) => book.category))]

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = {
    total: books.length,
    categories: categories.length - 1,
    totalSize: books.reduce((sum, book) => {
      const size = Number.parseFloat(book.fileSize.split(" ")[0])
      const unit = book.fileSize.split(" ")[1]
      if (unit === "MB") return sum + size
      if (unit === "KB") return sum + size / 1024
      if (unit === "GB") return sum + size * 1024
      return sum
    }, 0),
    avgRating:
      books.length > 0 ? (books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length).toFixed(1) : "0",
  }

  const handleReadBook = (book: Book) => {
    setSelectedBook(book)
  }

  const handleDownloadBook = (book: Book) => {
    const downloadUrl = getDirectDownloadLink(book.driveFileId)
    window.open(downloadUrl, "_blank")
  }

  const openInGoogleDrive = (book: Book) => {
    window.open(`https://drive.google.com/file/d/${book.driveFileId}/view`, "_blank")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your books from Google Drive...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Digital Library</h1>
            <p className="text-muted-foreground">Your personal collection from Google Drive</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadBooks} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() =>
                window.open("https://drive.google.com/drive/folders/1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po", "_blank")
              }
              className="pulse-glow"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Drive
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Books</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{stats.categories}</p>
                </div>
                <Filter className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold">{stats.totalSize.toFixed(1)} MB</p>
                </div>
                <Download className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-200/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="capitalize"
            >
              {category}
              {category !== "all" && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {books.filter((book) => book.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} variant="outline" size="sm">
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>

      {/* Books Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {filteredBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BookCard
              book={book}
              onRead={handleReadBook}
              onDownload={handleDownloadBook}
              onOpenInDrive={() => openInGoogleDrive(book)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredBooks.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button
            onClick={() =>
              window.open("https://drive.google.com/drive/folders/1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po", "_blank")
            }
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Add books to Google Drive
          </Button>
        </motion.div>
      )}

      {/* PDF Reader Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-6xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {selectedBook?.title}
              <Badge variant="outline" className="ml-2">
                {selectedBook?.fileSize}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="flex-1 min-h-0">
              <PDFViewer
                file={getEmbeddablePDFLink(selectedBook.driveFileId)}
                title={selectedBook.title}
                book={selectedBook}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
