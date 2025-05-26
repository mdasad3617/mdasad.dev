import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Layout } from "@/components/Layout"
import { BooksPage } from "@/pages/BooksPage"
import "./index.css"

// Placeholder pages
const HomePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Welcome to your Content Hub!</h1>
    <p className="text-muted-foreground">Your personal space for books, notes, todos, and more.</p>
  </div>
)

const TodosPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Todos</h1>
    <p className="text-muted-foreground">Manage your tasks and stay organized.</p>
  </div>
)

const NotesPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Notes</h1>
    <p className="text-muted-foreground">Capture your thoughts and ideas.</p>
  </div>
)

const BlogPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Blog</h1>
    <p className="text-muted-foreground">Share your thoughts with the world.</p>
  </div>
)

const ProjectsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Projects</h1>
    <p className="text-muted-foreground">Manage your personal and professional projects.</p>
  </div>
)

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Settings</h1>
    <p className="text-muted-foreground">Customize your content hub experience.</p>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
