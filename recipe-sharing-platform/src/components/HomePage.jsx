import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data.json'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setRecipes(data)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter((r) => {
      const title = (r.title || '').toLowerCase()
      const summary = (r.summary || '').toLowerCase()
      return title.includes(q) || summary.includes(q)
    })
  }, [recipes, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Recipes</h1>
          <p className="mt-1 text-sm text-gray-600">Browse recipes and open any recipe to see details.</p>
        </div>

        <div className="w-full sm:w-80">
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type recipe name..."
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{recipe.summary}</p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                View details
                <span className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm text-gray-600">No recipes found.</p>
        </div>
      )}
    </div>
  )
}
