"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, Download, ExternalLink, RotateCw } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  fileSize: string
  driveFileId: string
}

interface PDFViewerProps {
  file: string
  title?: string
  book?: Book
}

export function PDFViewer({ file, title, book }: PDFViewerProps) {
  const [scale, setScale] = useState(1.0)
  const [rotation, setRotation] = useState(0)

  const zoomIn = () => {
    setScale((prev) => Math.min(2.0, prev + 0.2))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2))
  }

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const downloadPDF = () => {
    if (book) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${book.driveFileId}`
      window.open(downloadUrl, "_blank")
    }
  }

  const openInGoogleDrive = () => {
    if (book) {
      window.open(`https://drive.google.com/file/d/${book.driveFileId}/view`, "_blank")
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold">{title}</h3>
            {book && (
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {book.fileSize}
                </Badge>
                <span className="text-xs text-muted-foreground">by {book.author}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={zoomOut} variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
          <Button onClick={zoomIn} variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button onClick={rotate} variant="outline" size="sm">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button onClick={downloadPDF} variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button onClick={openInGoogleDrive} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Embed */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div
            className="border rounded-lg overflow-hidden shadow-lg"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease",
            }}
          >
            <iframe src={file} className="w-[800px] h-[1000px]" title={title} frameBorder="0" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 border-t bg-muted/50">
        <p className="text-xs text-muted-foreground text-center">
          📖 Reading from Google Drive • Use browser's built-in PDF controls for navigation •
          <Button variant="link" className="p-0 h-auto text-xs" onClick={openInGoogleDrive}>
            Open in Google Drive
          </Button>{" "}
          for full features
        </p>
      </div>
    </div>
  )
}
