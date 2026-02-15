import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data.json'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(data)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Recipe Sharing Platform</h1>
          <p className="mt-2 text-sm text-gray-600 md:text-base">Browse recipes and open details.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="h-44 w-full overflow-hidden bg-gray-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{recipe.summary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                  View details <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
