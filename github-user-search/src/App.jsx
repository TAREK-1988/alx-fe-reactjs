import Search from "./components/Search.jsx"

export default function App() {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-2xl font-bold">GitHub User Search</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search GitHub profiles by username or advanced filters
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Search />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
          Built with React, Axios, and Tailwind CSS
        </div>
      </footer>
    </div>
  )
}
