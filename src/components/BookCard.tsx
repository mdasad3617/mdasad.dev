"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, ExternalLink, Calendar, HardDrive } from "lucide-react"
import { motion } from "framer-motion"

interface Book {
  id: string
  title: string
  author: string
  cover: string
  pdfUrl: string
  category: string
  pages?: number
  description?: string
  rating?: number
  fileSize: string
  lastModified: string
  driveFileId: string
}

interface BookCardProps {
  book: Book
  onRead: (book: Book) => void
  onDownload: (book: Book) => void
  onOpenInDrive?: (book: Book) => void
}

export function BookCard({ book, onRead, onDownload, onOpenInDrive }: BookCardProps) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
      <Card className="book-card h-full overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/20 hover:shadow-xl">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=400&width=300"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Badge variant="secondary" className="text-xs">
              {book.category}
            </Badge>
            {book.rating && (
              <Badge variant="default" className="text-xs">
                ⭐ {book.rating}
              </Badge>
            )}
          </div>

          {/* File info */}
          <div className="absolute bottom-2 left-2 flex flex-col gap-1">
            <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/20">
              <HardDrive className="h-3 w-3 mr-1" />
              {book.fileSize}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 leading-tight">{book.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
          {book.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{book.description}</p>}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Modified: {book.lastModified}</span>
          </div>

          {book.pages && <p className="text-xs text-muted-foreground mt-1">{book.pages} pages</p>}
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2">
          <Button onClick={() => onRead(book)} className="flex-1 text-xs" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            Read
          </Button>
          <Button onClick={() => onDownload(book)} variant="outline" size="sm" className="text-xs">
            <Download className="h-3 w-3" />
          </Button>
          {onOpenInDrive && (
            <Button onClick={() => onOpenInDrive(book)} variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
