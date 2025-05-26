// Google Drive API service
const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
const FOLDER_ID = "1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po"

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size: string
  modifiedTime: string
  webViewLink: string
  webContentLink: string
  thumbnailLink?: string
}

export interface Book {
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

// Parse book information from filename
function parseBookInfo(filename: string): { title: string; author: string; category: string } {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.pdf$/i, "")

  if (nameWithoutExt.includes("Alan_Turing")) {
    return {
      title: "Alan Turing's Automatic Computing Engine",
      author: "B. Jack Copeland",
      category: "Computer Science",
    }
  }

  if (nameWithoutExt.toLowerCase().includes("python")) {
    return {
      title: "Python Programming Examples",
      author: "Various Authors",
      category: "Programming",
    }
  }

  if (nameWithoutExt.includes("Von Neumann")) {
    return {
      title: "The Computer and the Brain",
      author: "John von Neumann",
      category: "Computer Science",
    }
  }

  // Fallback parsing
  const parts = nameWithoutExt.split(/[_\-[\]()]/g).filter(Boolean)
  return {
    title: parts.slice(0, 3).join(" ").replace(/[_]/g, " "),
    author: parts.length > 3 ? parts[parts.length - 1] : "Unknown Author",
    category: "General",
  }
}

// Get book cover from Open Library API
async function getBookCover(title: string, author: string): Promise<string> {
  try {
    const query = encodeURIComponent(`${title} ${author}`)
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`)
    const data = await response.json()

    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
    }
  } catch (error) {
    console.error("Error fetching book cover:", error)
  }

  // Fallback to a placeholder
  return "/placeholder.svg?height=400&width=300"
}

// Mock data based on your actual files
function getMockBooks(): Book[] {
  return [
    {
      id: "1",
      title: "Alan Turing's Automatic Computing Engine",
      author: "B. Jack Copeland",
      cover: "https://covers.openlibrary.org/b/isbn/9780198565932-L.jpg",
      pdfUrl: "https://drive.google.com/file/d/1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po/view",
      category: "Computer Science",
      fileSize: "3.9 MB",
      lastModified: "Mar 20, 2019",
      driveFileId: "mock-1",
      description:
        "A comprehensive exploration of Alan Turing's groundbreaking work on automatic computing machines and their theoretical foundations.",
      rating: 4.8,
      pages: 580,
    },
    {
      id: "2",
      title: "Python Programming Examples",
      author: "Various Authors",
      cover: "https://covers.openlibrary.org/b/isbn/9781593279288-L.jpg",
      pdfUrl: "https://drive.google.com/file/d/1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po/view",
      category: "Programming",
      fileSize: "2.1 MB",
      lastModified: "Oct 11, 2021",
      driveFileId: "mock-2",
      description: "A collection of practical Python programming examples covering various concepts and applications.",
      rating: 4.5,
      pages: 320,
    },
    {
      id: "3",
      title: "The Computer and the Brain",
      author: "John von Neumann",
      cover: "https://covers.openlibrary.org/b/isbn/9780300181111-L.jpg",
      pdfUrl: "https://drive.google.com/file/d/1iyXws8WNTrCVTXH3Do7Mr1LzfIxPK6po/view",
      category: "Computer Science",
      fileSize: "808 KB",
      lastModified: "Aug 23, 2021",
      driveFileId: "mock-3",
      description:
        "Von Neumann's influential work comparing the functioning of computers and the human brain, laying groundwork for modern computing theory.",
      rating: 4.9,
      pages: 82,
    },
  ]
}

// Utility function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Fetch files from Google Drive (requires API key)
export async function fetchBooksFromDrive(): Promise<Book[]> {
  try {
    if (!GOOGLE_DRIVE_API_KEY) {
      console.warn("Google Drive API key not found, using mock data")
      return getMockBooks()
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,thumbnailLink)`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Drive")
    }

    const data = await response.json()
    const pdfFiles = data.files.filter((file: DriveFile) => file.mimeType === "application/pdf")

    const books: Book[] = await Promise.all(
      pdfFiles.map(async (file: DriveFile) => {
        const bookInfo = parseBookInfo(file.name)
        const cover = await getBookCover(bookInfo.title, bookInfo.author)

        return {
          id: file.id,
          title: bookInfo.title,
          author: bookInfo.author,
          category: bookInfo.category,
          cover,
          pdfUrl: file.webContentLink,
          fileSize: formatFileSize(Number.parseInt(file.size)),
          lastModified: new Date(file.modifiedTime).toLocaleDateString(),
          driveFileId: file.id,
          description: `A comprehensive book on ${bookInfo.category.toLowerCase()}`,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating between 3-5
        }
      }),
    )

    return books
  } catch (error) {
    console.error("Error fetching books from Google Drive:", error)
    return getMockBooks()
  }
}

// Get direct download link for Google Drive file
export function getDirectDownloadLink(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

// Get embeddable PDF link for Google Drive file
export function getEmbeddablePDFLink(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`
}
