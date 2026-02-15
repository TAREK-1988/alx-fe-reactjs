import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from '../data.json'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  const recipeId = useMemo(() => Number(id), [id])

  useEffect(() => {
    const found = data.find((r) => Number(r.id) === recipeId)
    setRecipe(found || null)
  }, [recipeId])

  if (!recipe) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-xl font-semibold text-gray-900">Recipe not found</h1>
        <p className="mt-2 text-sm text-gray-600">The recipe you’re looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          ← Back
        </Link>
        <div className="text-xs text-gray-500">Recipe ID: {recipe.id}</div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="relative h-56 w-full bg-gray-100 sm:h-72">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{recipe.title}</h1>
          <p className="mt-3 text-sm text-gray-600">{recipe.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-700">
            {(recipe.ingredients || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Steps</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-700">
            {(recipe.steps || []).map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
